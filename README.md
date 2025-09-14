# VCAN Log Player Plugin for SignalK

## Function and goal of the plugin

The plugin is able to replay / reprocess SignalK log files. The original timestamp can be kept (if configured in plugin configuration).

## General (one time) configuration

1. Set up virtual CAN interface

    Set up a virtual CAN interface on your Rasperry Pi (login with SSH) with following commands:

    Variant A (interface only exists until next reboot of the Raspberry Pi!) 

        sudo modprobe vcan
        sudo ip link add dev vcan0 type vcan
        sudo ip link set up vcan0

    Variant B (permant interface)

        1. Create setup script
            1.1 Create a script that adds and activates the vcan0 interface:
                sudo nano /usr/local/bin/setup_vcan.sh
            1.2. Add the following content:
                 #!/bin/bash
                ip link add dev vcan0 type vcan 2>/dev/null || true
                ip link set up vcan0
            1.3. Make the script executable:
                sudo chmod +x /usr/local/bin/setup_vcan.sh
        2. Create a systemd service
            2.1. Create a service file that runs the setup script
                automatically during boot:
                sudo nano /etc/systemd/system/vcan.service
            2.2. Insert the following content:
                    [Unit]
                    Description=Setup virtual CAN interface vcan0
                    After=network.target

                    [Service]
                    Type=oneshot
                    ExecStart=/usr/local/bin/setup_vcan.sh
                    RemainAfterExit=yes

                    [Install]
                    WantedBy=multi-user.target
            2.3.Enable and start the service
                    sudo systemctl daemon-reexec
                    sudo systemctl enable vcan.service
                    sudo systemctl start vcan.service

2. Create data connection in SignalK

    ![Screenshot not available](https://raw.githubusercontent.com/formifan2002/signalk-vcan-logplayer/main/img/configure-dataconnection.png)

## Plugin configuration

1. SignalK port

    Port number where SignalK server is running (default 3000)

2. Input Directory

    Specify the directory in which the log file for processing is expected. The name of the log file must be input.log.

3. Keep original timing (yes/no)

    The processing of the log file can be done according to the original timestamps of the recorded records. The plugin will process the file and wait for the next record according to the delta of the timestamp in the original file.

4. Use original timestamps (yes/no)

    While processing data via the canbus, SignalK creates the timestamps according to the processing time. With this option you can keep the original timestamps recorded in the log file.

5. Specific timeframe (yes/no)
    
    The reprocessing of the log file is only done for a specific time frame. The time frame is configured in two separate fields (start/end) in the format HH:MM:SS (HH=hours,MM=minutes,SS=seconds - e.g. 23:40:58). End time must be equal or greater than start time.

ATTENTION: SignalK server must be restarted after each configuration change or if a new file has been copied to the input directory!