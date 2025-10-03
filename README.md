# VCAN Log Player Plugin for SignalK

## Function and goal of the plugin

The plugin is able to replay / reprocess NMEA2000 log files. The log files can be in the following formats:

1. SignalK log file format
    - Example: "1757152681394;A;2025-09-06T09:58:01.393Z,6,127258,1,255,8,ff,f7,34,40,62,01,ff,ff"
2. Actisense format 
    - Example: "2025-09-06T09:58:01.393Z,6,127258,1,255,8,ff,f7,34,40,62,01,ff,ff"
3. SocketCAN / candump format
    - Example: "can0  0DFD0264   [8]  FF E1 00 FA 63 FB FF FF"
4. candump variant with timestamp

    - Example: "(1693994280.058123)  can0  09F8027E   [8]  FF F7 34 40 62 01 FF FF"

In case the log file is in SignalK, Actisense or candump variant with timestampe format:

- the original timestamp can be kept (if configured in plugin configuration).
- the timeframe of processed lines can be configured in the plugin configuration (start / end time)

## Plugin configuration

1. Input Directory

    Specify the directory in which the log file for processing is expected. The name of the log file must be input.log.

2. Create log file (yes/no)

   During (re-)processing, a log file named vcan-logplayer.log is created in the input directory. It documents the processing of the input file, including informational and error messages, timestamps of processed messages (start/end), counts of each PGN along with their respective sources (SRC), and the description of each PGN.

3. Keep original timing (yes/no)

    The processing of the log file can be done according to the original timestamps of the recorded records. The plugin will process the file and wait for the next record according to the delta of the timestamp in the original file.

4. Use original timestamps (yes/no)

    While processing data via the canbus, SignalK creates the timestamps according to the processing time. With this option you can keep the original timestamps recorded in the log file.

5. Specific timeframe (yes/no)
    
    The reprocessing of the log file is only done for a specific time frame. The time frame is configured in two separate fields (start/end) in the format HH:MM:SS (HH=hours,MM=minutes,SS=seconds - e.g. 23:40:58). End time must be equal or greater than start time.

ATTENTION: SignalK server must be restarted if a new file has been copied to the input directory! Alternatively disable the plugin and enable it afterwards again in order to start the processing.