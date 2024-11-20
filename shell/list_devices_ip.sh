#!/bin/bash

# Check if an interface was provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <network_interface>"
    exit 1
fi

INTERFACE=$1

# Get the IP address and subnet mask of the specified interface
IP_INFO=$(ip addr show $INTERFACE | grep 'inet ' | awk '{print $2}')

if [ -z "$IP_INFO" ]; then
    echo "No IP address found for interface $INTERFACE."
    exit 1
fi

echo "IP info"
echo $IP_INFO


IP_ADDRESS=$(echo $IP_INFO | cut -d'/' -f1)
NETMASK=$(echo $IP_INFO | cut -d'/' -f2)

# Convert CIDR to subnet
SUBNET=$(ipcalc -n $IP_ADDRESS/$NETMASK | grep Network | awk '{print $2}')

echo "Subnet"
echo $SUBNET

echo "Scanning network $SUBNET for devices..."

# Scan the network using nmap
nmap -sn $SUBNET | grep 'Nmap scan report' | awk '{print $5}'

echo "Scan complete."
