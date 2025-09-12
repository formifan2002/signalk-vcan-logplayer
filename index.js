const fs = require('fs');
const readline = require('readline');
const can = require('socketcan');
const axios = require('axios');

module.exports = function(app) {
  let running = false;
  let channel;
  let fileStream;

  // Batching: source → { lastTimestamp, queued: [ts_ms, pgn, src] }
  const sourceQueue = new Map();
  const BATCH_DELAY = 100; // ms

  const plugin = {};
  plugin.id = 'vcan-logplayer';
  plugin.name = 'VCAN Log Player';
  plugin.description = 'Processes log files from the SignalK server (possibly with original timestamp) as NMEA2000 via canbus (canboatjs).';

  plugin.schema = {
    type: 'object',
    properties: {
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
        description: "The timestamps in the log file are not overwritten",
        title: 'Use original timestamps',
        default: true
      }
    }
  };

  async function createDeltaBatchForSource(source) {
    const queueItem = sourceQueue.get(source);
    if (!queueItem || queueItem.queued.length === 0) return;

    try {
      const url = `${app.config.selfUrl}/v1/api/vessels/self`;
      const res = await axios.get(url);
      const vessel = res.data.vessels?.self;
      if (!vessel) return;

      const values = [];
      function traverse(obj, path=[]) {
        for (const k in obj) {
          if (!obj.hasOwnProperty(k)) continue;
          const val = obj[k];
          const currentPath = [...path, k];
          if (val && val.source === source && val.value !== undefined) {
            values.push({ path: currentPath.join('.'), value: val.value });
          } else if (typeof val === 'object') {
            traverse(val, currentPath);
          }
        }
      }
      traverse(vessel);

      if (values.length === 0) return;

      const delta = {
        context: 'vessels.self',
        updates: [{
          timestamp: new Date(queueItem.lastTimestamp).toISOString(),
          values
        }]
      };

      app.handleDelta(delta);
      app.debug(`Delta batch for source ${source} produces (${values.length} values)`);

      // Queue leeren
      queueItem.queued = [];
    } catch (err) {
      app.error('Error creating delta batch for source', source, err);
    }
  }

  plugin.start = function(options) {
    app.debug('Plugin started with options:', options);
    running = true;

    const filePath = `${options.inputDirectory}/input.log`;
    if (!fs.existsSync(filePath)) {
      app.error('Log file does not exist:', filePath);
      return;
    }

    channel = can.createRawChannel('vcan0', true);
    channel.start();

    fileStream = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    });

    let lastTimestamp = null;

    fileStream.on('line', line => {
      if (!running) return;

      const parts = line.split(';');
      if (parts.length < 3) return;

      const ts_ms = parseInt(parts[0]);
      if (isNaN(ts_ms)) return;

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

        const sendFrame = () => {
          try {
            channel.send(frame);
            app.debug(`Sent PGN ${pgn} src ${src} -> dst ${dst} data [${dataBytes.join(', ')}]`);
          } catch (err) {
            app.error('Error sending:', err);
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

        // Originaltimestamp-Deltas mit Batch
        if (options.originaltimestamp) {
          const sourceKey = `pgn_${pgn}_${src}`;
          if (!sourceQueue.has(sourceKey)) {
            sourceQueue.set(sourceKey, { lastTimestamp: ts_ms, queued: [] });
          }
          const queueItem = sourceQueue.get(sourceKey);
          queueItem.lastTimestamp = ts_ms;
          queueItem.queued.push({ ts_ms, pgn, src });

          // Timer setzen oder resetten
          if (!queueItem.timer) {
            queueItem.timer = setTimeout(async () => {
              await createDeltaBatchForSource(sourceKey);
              clearTimeout(queueItem.timer);
              queueItem.timer = null;
            }, BATCH_DELAY);
          } else {
            clearTimeout(queueItem.timer);
            queueItem.timer = setTimeout(async () => {
              await createDeltaBatchForSource(sourceKey);
              clearTimeout(queueItem.timer);
              queueItem.timer = null;
            }, BATCH_DELAY);
          }
        }

      } catch (err) {
        app.error('Error processing line:', line, err);
      }
    });

    fileStream.on('close', () => {
      app.debug('Done with log file');
      channel.stop();
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
