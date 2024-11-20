#!/bin/bash

# Get the local IP address and subnet
LOCAL_IP=$(hostname -I | awk '{print $1}')
SUBNET=$(echo $LOCAL_IP | cut -d'.' -f1-3).0/24

echo "Scanning network $SUBNET for devices..."

# Scan the network using nmap
nmap -sn $SUBNET | grep 'Nmap scan report' | awk '{print $5 " - " $6}'

echo "Scan complete."
