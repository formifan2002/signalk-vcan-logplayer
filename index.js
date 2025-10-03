const fs = require('fs');
const readline = require('readline');
const canboat = require('@canboat/canboatjs');
const { FromPgn } = require('@canboat/canboatjs');
const n2kMapper = require('@signalk/n2k-signalk/dist/n2kMapper.js');
const pgnNotFound=[];
var pgnPath = [];
Object.assign(pgnPath, require('./pgns'));

module.exports = function(app) {
  let running = false;
  let fileStream;
  let logFileStream;
  let lastTimestamp = null;
  let startTimestamp=null;
  let pgnSrcCount = {};
  let srcCountMap = {};
  let srcPgnMap = {};

  const parser = new FromPgn();
  const plugin = {};
  plugin.id = 'vcan-logplayer';
  plugin.name = 'VCAN Log Player';
  plugin.description = 'Processes NMEA2000 log entries of a log file from the SignalK server (possibly with original timestamp)';
  plugin.schema = {
      type: 'object',
      properties: {
        inputDirectory: {
          type: 'string',
          title: 'Input Directory',
          description: "Directory in which the log file (name: input.log) is expected for processing",
          default: '/home/pi/vcan-logplayer'
        },
        createLogfile: {
          type: 'boolean',
          description: "Log file of processing (vcan-logplayer.log) is created in input directory with a.o. information about counts of each PGN along with their respective sources (SRC), and the description of each PGN",
          title: "Create log file",
          default: false
        },
        realtime: {
          type: 'boolean',
          description: "Data is processed according to the timestamp in the log file (with waits) or directly one after the other",
          title: 'Keep original timing',
          default: true
        },
        originaltimestamp: {
          type: 'boolean',
          description: "In case of 'SignalK', 'Actisense' or 'candump with timestamp' log files, the created timestamps should be 1:1 like in the reprocessed log file (otherwise the timestamp of the reprocessing will be taken)",
          title: 'Use original timestamps',
          default: true
        },
        timeframe: {
          type: 'boolean',
          title: 'Specific timeframe',
          description: "The reprocessing of the log file is only done for a specific time frame (only possible for 'SignalK'. 'Actisense' or 'camdump with timestamp' log files!)",
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

  plugin._timeframeEnabled = false;
  plugin._timeframeStartSec = 0;
  plugin._timeframeEndSec = 0;

  function logInfo(msg) {
    app.debug(msg);
    if (plugin.options.createLogfile){
      if (logFileStream && !logFileStream.destroyed) {
        logFileStream.write(`[INFO] ${new Date().toLocaleString()} ${msg}\n`);
      }
    }
  }

  function logError(msg) {
    app.error(msg);
    if (plugin.options.createLogfile){  
      if (logFileStream && !logFileStream.destroyed) {
        logFileStream.write(`[ERROR] ${new Date().toLocaletring()} ${msg}\n`);
      }
    }
  }

  function initTimeframe(options) {
    if (!options || !options.timeframe) { plugin._timeframeEnabled = false; return true; }
    const start = (options.timeframestart || '00:00:00').trim();
    const end   = (options.timeframeend || '00:00:00').trim();
    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!regex.test(start) || !regex.test(end)) { logError(`Invalid timeframe format. start='${start}' end='${end}'`); return false; }
    function toSeconds(hms) { const [h, m, s] = hms.split(':').map(Number); return h*3600 + m*60 + s; }
    const startSec = toSeconds(start);
    const endSec   = toSeconds(end);
    if (endSec < startSec) { logError(`Invalid timeframe: end (${end}) must be >= start (${start})`); return false; }
    plugin._timeframeEnabled = true;
    plugin._timeframeStartSec = startSec;
    plugin._timeframeEndSec = endSec;
    return true;
  }

  function isInTimeframe(ts_ms) {
    if (!plugin._timeframeEnabled) return true;
    const d = new Date(Number(ts_ms));
    if (isNaN(d.getTime())) return false;
    const localSec = d.getHours()*3600 + d.getMinutes()*60 + d.getSeconds();
    return (localSec >= plugin._timeframeStartSec && localSec <= plugin._timeframeEndSec);
  }

  function formatLocalTime(ts) {
  if (!ts) return "unknown";
  const d = new Date(Number(ts));
  return d.toLocaleTimeString("de-DE", { hour12: false }); // HH:MM:SS in lokaler Zeit
  }

function normalizeLine(line) {
  if (!line || typeof line !== 'string') return null;
  const trimmed = line.trim();

  // Actisense mit Präfix oder nur CSV
  if (trimmed.includes(';')) {
    const parts = trimmed.split(';');
    if (parts.length >= 3) {
      const subLine = parts[2];
      const tsPrefix = parseFloat(parts[0]);
      const ts_ms = !isNaN(tsPrefix) ? tsPrefix : null;
      return { line: subLine, timestamp: ts_ms };
    }
  }

  // candump mit UNIX-Zeitstempel in Klammern
  if (trimmed.startsWith('(') && trimmed.includes('can')) {
    const match = trimmed.match(/^\((\d+(\.\d+)?)\)\s*(.+)$/);
    if (match) {
      const ts_sec = parseFloat(match[1]);
      const ts_ms = Math.round(ts_sec * 1000);
      const restLine = match[3].replace(/\s+/g, ' ');
      return { line: restLine, timestamp: ts_ms };
    }
  }

  // normales candump / SocketCAN
  if (/^\w+\s+[0-9A-F]+\s+\[\d+\]/i.test(trimmed)) {
    return { line: trimmed, timestamp: null };
  }

  // Actisense CSV ohne Präfix
  if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
    const ts_ms = Date.parse(trimmed.split(',')[0]);
    return { line: trimmed, timestamp: ts_ms };
  }

  return null;
}

function parseNormalizedLine(line) {
  if (!line || typeof line !== 'string') return null;
  const trimmed = line.trim();
  if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
    const parts = trimmed.split(',');
    if (parts.length < 7) return null;

    const timestamp = parts[0];
    const prio = parseInt(parts[1]);
    const pgn  = parseInt(parts[2]);
    const src  = parseInt(parts[3]);
    const dst  = parseInt(parts[4]);
    const len  = parseInt(parts[5]);

    const dataBytes = parts.slice(6, 6 + len);
    const dataBytesInt = dataBytes.map(h => parseInt(h, 16));
    const dataHex = dataBytes.join('');

    return { timestamp, prio, pgn, src, dst, len, dataBytes, dataBytesInt, dataHex };
  }
  if (/^\w+\s+[0-9A-F]+\s+\[\d+\]/i.test(trimmed)) {
    const match = trimmed.match(/^(\w+)\s+([0-9A-F]+)\s+\[(\d+)\]\s+((?:[0-9A-F]{2}\s*)+)$/i);
    if (!match) return null;

    const iface = match[1];
    const canIdHex = match[2];
    const len = parseInt(match[3]);
    const dataBytes = match[4].trim().split(/\s+/);
    const dataBytesInt = dataBytes.map(h => parseInt(h, 16));
    const dataHex = dataBytes.join('');

    return { iface, canIdHex, len, dataBytes, dataBytesInt, dataHex };
  }

  return null; 
}

    async function processCanboat(line,timestamp) {
    const parsed = parser.parseString(line);
    if (!parsed || !parsed.fields) return;
    if (timestamp &&  !isInTimeframe(timestamp)) return;
    const normalizedLine=parseNormalizedLine(line)
    const msg = {
      timestamp: (!plugin.options.originaltimestamp || !timestamp )? new Date().toISOString() :new Date(timestamp).toISOString(),
      prio: parsed.prio,
      src: parsed.src,
      dst: parsed.dst,
      pgn: parsed.pgn,
      dataBytes: normalizedLine.dataBytes,
      dataBytesInt: normalizedLine.dataBytesInt,
  	  description: parsed.description,
      fields: parsed.fields
    };
    let update=null;
    update = n2kMapper.toDelta(msg);
    if (parsed.pgn===129044){
      const test1=1;
    }
    if (update.updates[0] && update.updates[0].values.length===0 ) {
      if (pgnPath[parsed.pgn]){
        const arr = [];
        arr[parsed.pgn]=[]
        for (const [field, value] of Object.entries(msg.fields)) {
            if (value !== null && value !== undefined) {
              if (!pgnPath[parsed.pgn][0].getPath){
                 arr[parsed.pgn].push({source: field, node: function retPath(){return pgnPath[parsed.pgn][0].path+'.'+field}}) 
              }else{
                  arr[parsed.pgn].push({
                      source: field,
                      node: function retPath() {
                        return pgnPath[parsed.pgn][0].getPath(msg, field);
                      }
                  });
              }
            }
        }
        update = n2kMapper.toDelta(msg,null,arr);
        if (pgnPath[parsed.pgn][0].type === 'object'){
          const vals = update.updates[0].values;
          const firstPath = vals[0].path;
          const idx = firstPath.lastIndexOf('.');
          const basePath = idx >= 0 ? firstPath.slice(0, idx) : firstPath;
          const obj = {};
          for (const v of vals) {
            if (!v || v.value === undefined) continue;
            const p = v.path;
            const idx2 = p.lastIndexOf('.');
            const propName = idx2 >= 0 ? p.slice(idx2 + 1) : p;
            obj[propName] = v.value;
          }
          update.updates[0].values = [{ path: basePath, value: obj }];
        }
      }else{
        if (!pgnNotFound[parsed.pgn]){
          pgnNotFound[parsed.pgn]=true;
          logInfo(`No definition found for PGN: ${parsed.pgn} SRC: ${parsed.src}`);
        }
      }
    }
    if (update.updates[0].values.length>0){
       const key = `${parsed.pgn} ${parsed.src}`;
       if (!pgnSrcCount[key]) pgnSrcCount[key] = { count: 0, description: parsed.description || '' };
       pgnSrcCount[key].count += 1;

       if (!srcCountMap[parsed.src]) srcCountMap[parsed.src] = 0;
       srcCountMap[parsed.src] += 1;
       if (!srcPgnMap[parsed.src]) srcPgnMap[parsed.src] = {};
       if (!srcPgnMap[parsed.src][parsed.pgn]) srcPgnMap[parsed.src][parsed.pgn] = 0;
       srcPgnMap[parsed.src][parsed.pgn] += 1;
       update.updates[0].source.label = `${plugin.id} (PGN ${parsed.pgn}, SRC ${parsed.src})`;
       update.updates[0].$source = `${plugin.id} (PGN ${parsed.pgn}, SRC ${parsed.src})`;
       const delta = { context: 'vessels.self', updates: [update.updates[0]] };
       // Wartezeit am Ende
       if (plugin.options.realtime && lastTimestamp && timestamp) {
          if (!lastTimestamp){
            startTimestamp=timestamp
          }
          const wait = timestamp - lastTimestamp;
          if (wait > 0) {
            await new Promise(resolve => setTimeout(resolve, wait));
          }
       }
       app.handleMessage(plugin.id, delta)
    }
    lastTimestamp=timestamp;
  }
  
  plugin.start = function(options) {
  plugin.options = options;
  running = true;

  const logPath = `${options.inputDirectory}/vcan-logplayer.log`;
  if (plugin.options.createLogfile) {
    // Logdatei zuerst öffnen, bevor irgendwas geschrieben wird
    logFileStream = fs.createWriteStream(logPath, { flags: 'w' });
  }

  logInfo(`Plugin started with options: ${JSON.stringify(options)})`);

  if (!initTimeframe(options)) {
    logError('Timeframe init failed. Please check plugin configuration. Plugin stopped.');
    return;
  }

  const filePath = `${options.inputDirectory}/input.log`;
  if (!fs.existsSync(filePath)) {
    logError(`Log file not found: ${filePath}`);
    return;
  }

  logInfo(`Logging to file: ${logPath}`);

  fileStream = readline.createInterface({ input: fs.createReadStream(filePath), crlfDelay: Infinity });

  fileStream.on('line', line => {
    if (!running) return;
    const processLine = normalizeLine(line);
    if (!processLine) return;
    processCanboat(processLine.line, processLine.timestamp);
  });

fileStream.on('close', () => {
  if (Object.keys(pgnSrcCount).length > 0) {
    logInfo('Processed PGN+SRC counts:');

    const sortedKeys = Object.keys(pgnSrcCount).sort((a, b) => {
      const [pgnA, srcA] = a.split(' ').map(Number);
      const [pgnB, srcB] = b.split(' ').map(Number);
      if (pgnA !== pgnB) return pgnA - pgnB;
      return srcA - srcB;
    });

    let totalCount = 0;
    sortedKeys.forEach(key => {
      const [pgn, src] = key.split(' ');
      const { count, description } = pgnSrcCount[key];
      totalCount += count;
      logInfo(`PGN ${pgn} SRC ${src}: ${count} (${description})`);
    });

    logInfo(`Total messages processed: ${totalCount}`);

    const srcSummary = Object.keys(srcCountMap)
      .sort((a, b) => a - b)
      .map(src => `${src} (count: ${srcCountMap[src]})`)
      .join(', ');

    logInfo(`Processed SRCs: ${srcSummary}`);

    Object.keys(srcPgnMap).sort((a, b) => a - b).forEach(src => {
      const pgnCounts = Object.entries(srcPgnMap[src])
        .sort((a, b) => a[0] - b[0])
        .map(([pgn, count]) => `${pgn}: ${count}`)
        .join(', ');
      logInfo(`SRC ${src} processed PGNs: ${pgnCounts}`);
    });
  }

  if (startTimestamp) {
    const startStr = formatLocalTime(startTimestamp);
    const endStr = formatLocalTime(lastTimestamp);
    logInfo(`Log file closed. Done processing. (Startzeit: ${startStr} - Endzeit: ${endStr})`);
  } else {
    logInfo('Log file closed. Done processing.');
  }

  if (logFileStream && !logFileStream.destroyed) logFileStream.end();
});



};


  plugin.stop = function() {
    running = false;
    if (fileStream) fileStream.close();
    if (logFileStream && !logFileStream.destroyed) {
      logFileStream.end();
    }
    logInfo('Plugin stopped');
  };

  return plugin;
};
