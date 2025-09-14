const fs = require('fs');
const readline = require('readline');
const can = require('socketcan');
const axios = require('axios');

module.exports = function(app) {
  let running = false;
  let channel;
  let fileStream;

  const sourceQueue = new Map();
  const BATCH_DELAY = 500; // ms Ruhezeit nach letztem Senden, bevor Zeitstempel korrgiert wird

  const plugin = {};
  plugin.id = 'vcan-logplayer';
  plugin.name = 'VCAN Log Player';
  plugin.description = 'Processes log files from the SignalK server (possibly with original timestamp) as NMEA2000 via canboatjs.';

  plugin.schema = {
    type: 'object',
    properties: {
      serverPort: {
        type: 'number',
        title: 'SignalK port',
        description: "Port where SignalK server is running",
        default: 3000
      },
      inputDirectory: {
        type: 'string',
        title: 'Input Directory',
        description: "Directory in which the log file (name: input.log) is expected for processing",
        default: '/home/pi/vcan-logplayer'
      },
      realtime: {
        type: 'boolean',
        description: "Data is processed according to the timestamp in the log file or one after the other",
        title: 'Keep original timing',
        default: true
      },
      originaltimestamp: {
        type: 'boolean',
        description: "The created timestamps should be 1:1 like in the reprocessed log file (otherwise the timestamp of the reprocessing will be taken)",
        title: 'Use original timestamps',
        default: true
      },
      timeframe: {
        type: 'boolean',
        title: 'Specific timeframe',
        description: "The reprocessing of the log file is only done for a specific time frame",
        default: false
      },
      timeframestart: {
        type: 'string',
        title: 'Start of timeframe',
        description: "The reprocessing of the log file is only done starting at this time (format HH:MM:SS)",
        default: '00:00:00'
      },
      timeframeend: {
        type: 'string',
        title: 'End of timeframe',
        description: "The reprocessing of the log file is only done until this time (format HH:MM:SS)",
        default: '00:00:00'
      }
    }
  };

  // --- interne timeframe-Variablen (werden in start() gesetzt) ---
  plugin._timeframeEnabled = false;
  plugin._timeframeStartSec = 0;
  plugin._timeframeEndSec = 0;

  // -----------------------------
  // Prüfung und Initialisierung der Timeframe-Parameter (einmal beim start)
  // -----------------------------
  function initTimeframe(options) {
    if (!options || !options.timeframe) {
      plugin._timeframeEnabled = false;
      return true;
    }

    const start = (options.timeframestart || '00:00:00').trim();
    const end   = (options.timeframeend || '00:00:00').trim();

    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!regex.test(start) || !regex.test(end)) {
      app.error(`Invalid timeframe format. Use HH:MM:SS (HH=hour, MM=minutes, SS=seconds), got start='${start}' end='${end}'`);
      return false; // invalid
    }

    function toSeconds(hms) {
      const [h, m, s] = hms.split(':').map(Number);
      return h * 3600 + m * 60 + s;
    }

    const startSec = toSeconds(start);
    const endSec   = toSeconds(end);

    if (endSec < startSec) {
      app.error(`Invalid timeframe: timeframeend (${end}) must be >= timeframestart (${start})`);
      return false;
    }

    plugin._timeframeEnabled = true;
    plugin._timeframeStartSec = startSec;
    plugin._timeframeEndSec = endSec;

    return true;
  }

  // -----------------------------
  // Timeframe-Vergleich: lokale Uhrzeit des ts_ms (Systemzeit) vs konfiguriertes Fenster
  // -> nur für den Vergleich; ts_ms / Original-Timestamp wird nicht verändert
  // -----------------------------
  function isInTimeframe(ts_ms) {
    if (!plugin._timeframeEnabled) return true;

    // ts_ms ist epoch milliseconds
    const d = new Date(Number(ts_ms));
    if (isNaN(d.getTime())) {
      // ungültiger timestamp -> skip
      app.debug(`Invalid ts_ms for timeframe check: ${ts_ms}`);
      return false;
    }

    // lokale Stunden/Minuten/Sekunden des Systems
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    const localSec = h * 3600 + m * 60 + s;

    return (localSec >= plugin._timeframeStartSec && localSec <= plugin._timeframeEndSec);
  }

  // -----------------------------
  // Delta-Erstellung
  // -----------------------------
  async function createDeltaBatch(sourceKey, ts_ms) {
    const queueItem = sourceQueue.get(sourceKey);
    if (!queueItem || queueItem.queued.length === 0) return;

    try {
      const [pgn, src] = sourceKey.replace('pgn_', '').split('_');
      const expectedSource = `vcan0.${src}`;

      const url = `http://localhost:${plugin.options.serverPort}/signalk/v1/api/vessels/self`;
      const res = await axios.get(url);
      const vessel = res.data;

      const values = [];
      function traverse(obj, path = []) {
        if (!obj || typeof obj !== 'object') return;
        if (obj.$source === expectedSource && String(obj.pgn) === String(pgn) && obj.value !== undefined) {
          values.push({
            path: path.join('.'),
            value: obj.value
          });
        }
        for (const k in obj) {
          if (obj.hasOwnProperty(k)) traverse(obj[k], path.concat(k));
        }
      }
      traverse(vessel);

      if (values.length === 0) {
        app.debug(`Update timestamp: no matching values found for PGN ${pgn} src ${src}`);
        return;
      }

      const delta = {
        context: 'vessels.self',
        updates: [
          {
            source: {
              label: 'vcan0',
              type: 'NMEA2000',
              src: src,
              pgn: Number(pgn)
            },
            timestamp: new Date(ts_ms).toISOString(),
            values,
            $source: `vcan0.${src}`
          }
        ]
      };

      // app.debug(`Delta for sourceKey ${sourceKey}: ${JSON.stringify(delta, null, 2)}`);

      await app.handleMessage(plugin.id, delta);

      queueItem.queued = [];
      // app.debug(`Delta batch for ${sourceKey} sent with ${values.length} values`);
    } catch (err) {
      app.debug('Skipping delta batch for source (PGN not found or error)', sourceKey, err);
    }
  }

  // -----------------------------
  // Plugin Start
  // -----------------------------
  plugin.start = function(options) {
    plugin.options = options;
    app.debug('Plugin started with options:', options);
    running = true;

    // init timeframe (validiert bei Start)
    if (!initTimeframe(options)) {
      app.error('Timeframe initialization failed — aborting start.');
      return;
    }

    const filePath = `${options.inputDirectory}/input.log`;
    if (!fs.existsSync(filePath)) {
      app.error(`Log file does not exist: ${filePath}`);
      return;
    }

    channel = can.createRawChannel('vcan0', true);
    channel.start();

    fileStream = readline.createInterface({ input: fs.createReadStream(filePath), crlfDelay: Infinity });

    let lastTimestamp = null;

    fileStream.on('line', async line => {
      if (!running) return;

      const parts = line.split(';');
      if (parts.length < 3) return;

      const ts_ms = parseInt(parts[0]);
      if (isNaN(ts_ms)) return;

      // --- Zeitfensterprüfung (lokale Zeit basierend auf ts_ms)
      if (!isInTimeframe(ts_ms)) {
        return;
      }

      const dataFields = parts[2].split(',');
      if (dataFields.length < 6) return;

      try {
        const prio = parseInt(dataFields[1]);
        const pgn  = parseInt(dataFields[2]);
        const src  = parseInt(dataFields[3]);
        const dst  = parseInt(dataFields[4]);
        const len  = parseInt(dataFields[5]);
        const dataBytes = dataFields.slice(6, 6 + len).map(h => parseInt(h, 16));

        const canId = (prio << 26) | (pgn << 8) | src;
        const frame = { id: canId, ext: true, data: Buffer.from(dataBytes) };

        const sendFrame = async () => {
          try {
            channel.send(frame);
            // app.debug(`Sent PGN ${pgn} src ${src} -> dst ${dst} data [${dataBytes.join(', ')}]`);
            if (options.originaltimestamp) {
              setTimeout(async () => {
                const sourceKey = `pgn_${pgn}_${src}`;
                if (!sourceQueue.has(sourceKey)) {
                  sourceQueue.set(sourceKey, { queued: [], timer: null });
                }
                const queueItem = sourceQueue.get(sourceKey);
                queueItem.queued.push({ ts_ms, dataBytes });

                if (queueItem.timer) clearTimeout(queueItem.timer);
                queueItem.timer = setTimeout(async () => {
                  await createDeltaBatch(sourceKey, ts_ms);
                  queueItem.timer = null;
                }, BATCH_DELAY);
              }, 100);
            }
          } catch (err) {
            app.error('Error sending frame:', err);
          }
        };

        if (options.realtime && lastTimestamp !== null) {
          const wait = ts_ms - lastTimestamp;
          lastTimestamp = ts_ms;
          setTimeout(sendFrame, wait);
        } else {
          lastTimestamp = ts_ms;
          sendFrame();
        }

      } catch (err) {
        app.error('Error processing line:', line, err);
      }
    });

    fileStream.on('close', async () => {
      app.debug('Done with log file');
      channel.stop();
      for (const key of sourceQueue.keys()) {
        await createDeltaBatch(key, Date.now());
      }
    });
  };

  plugin.stop = function() {
    running = false;
    if (channel) channel.stop();
    if (fileStream) fileStream.close();
    app.debug('Plugin stopped');
  };

  return plugin;
};
