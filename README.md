# VCAN Log Player Plugin für Signal K

## Function and goal of the plugin

The plugin is able to replay / reprocess SignalK log files. The original timestamp can be kept (if configured in plugin configuration).

## General (one time) configuration

1. Set up the virtual CAN interface vcan0

    Set up the virtual CAN interface on your Rasperry Pi (login with SSH) with following commands:

    sudo modprobe vcan

    sudo ip link add dev vcan0 type vcan

    sudo ip link set up vcan0


2. Create data connection in SignalK

    ![Screenshot not available](https://raw.githubusercontent.com/formifan2002/signalk-vcan-logplayer/main/img/configure-dataconnection.png)

## Plugin configuration

1. Input Directory

    Specify the directory in which the log file for processing is expected. The name of the log file must be input.log.

2. Keep original timing

    The processing of the log file can be done according to the original timestamps of the recorded records. The plugin will process the file and wait for the next record according to the delta of the timestamp in the original file.
3. Use original timestamps

    While processing data via the canbus, SignalK creates the timestamps according to the processing time. With this option you can keep the original timestamps recorded in the log file.