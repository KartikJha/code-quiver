#!/bin/bash

# Ensure nmap is installed
if ! command -v nmap &> /dev/null; then
    echo "nmap is not installed. Please install it first."
    exit 1
fi

# Automatically detect the network interface and subnet
INTERFACE=$(ip route | grep default | awk '{print $5}')
if [ -z "$INTERFACE" ]; then
    echo "No active network interface found."
    exit 1
fi

SUBNET=$(ip -4 addr show $INTERFACE | grep -oP '(?<=inet\s)\d+(\.\d+){3}/\d+')

if [ -z "$SUBNET" ]; then
    echo "No active subnet found for interface $INTERFACE."
    exit 1
fi

echo "Using network interface: $INTERFACE"
echo "Scanning subnet: $SUBNET"

# Perform nmap scan
nmap -sn $SUBNET -oG - | awk '/Up$/{print $2 " is up"}' > devices.txt
nmap -Pn $SUBNET -oG - | awk '/Up$/{print $2 " is blocking ICMP requests"}' >> devices.txt

echo "Scan complete. Results:"
cat devices.txt

# Clean up
rm -f devices.txt

