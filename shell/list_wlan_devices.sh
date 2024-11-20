#!/bin/bash

# Define your WLAN interface (change wlan0 to your actual interface name if different)
WLAN_INTERFACE="wlo1"

# Check if the interface exists
if ! iwconfig 2>/dev/null | grep -q "$WLAN_INTERFACE"; then
    echo "WLAN interface $WLAN_INTERFACE not found."
    exit 1
fi

# Scan for devices
echo "Scanning for devices connected to $WLAN_INTERFACE..."
sudo iwlist $WLAN_INTERFACE scan | grep -E "Cell|ESSID" | awk -F: '{print $2}' | sed 's/^\s*//;s/\s*$//'

echo "Scan complete."
