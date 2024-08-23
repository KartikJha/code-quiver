#!/bin/bash

# Define the WLAN interface
WLAN_INTERFACE="wlan0"  # Change this to your WLAN interface name

# Function to get the IP range of the WLAN network
get_ip_range() {
    ip -o -f inet addr show $WLAN_INTERFACE | awk '{print $4}'
}

# Function to scan network for connected devices
scan_network() {
    local interface=$1
    local ip_range=$2

    echo "Scanning network on interface $interface with IP range $ip_range..."

    # Use nmap to perform a ping scan
    nmap -sn $ip_range -e $interface | awk '/Nmap scan report/{print $5}' | sort | uniq
}

# Get the IP range of the WLAN network
IP_RANGE=$(get_ip_range)

if [ -z "$IP_RANGE" ]; then
    echo "No IP range found for interface $WLAN_INTERFACE."
    exit 1
fi

# Scan the network to get all connected devices
echo "Scanning the network..."
CONNECTED_IPS=$(scan_network $WLAN_INTERFACE $IP_RANGE)

# Get the subnet of the WLAN network (e.g., 192.168.1.0/24)
SUBNET=$(echo $IP_RANGE | awk -F/ '{print $1}')

# Get the list of all IPs in the subnet
ALL_IPS=$(nmap -n -sL $SUBNET | grep 'Nmap scan report for' | awk '{print $5}')

# Find IPs that are not in the list of connected devices
echo -e "\nIP addresses not connected to the WLAN network:"
for ip in $ALL_IPS; do
    if ! echo "$CONNECTED_IPS" | grep -q "^$ip$"; then
        echo "$ip"
    fi
done

echo "Scan complete."
