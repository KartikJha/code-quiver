#!/bin/bash

# Define the subnet and output file
SUBNET="192.168.1"
OUTPUT_FILE="ping_results.txt"
SEARCH_PATTERN="64 bytes"  # Adjust this pattern based on what you want to grep for

# Clean up any previous output file
rm -f "$OUTPUT_FILE"

# Perform the ping scan and process results
for i in {1..254}; do
    IP="${SUBNET}.${i}"
    
    # Ping the IP address
    ping -c 1 -W 1 "$IP" > /dev/null 2>&1

    # Check if the ping was successful
    if [ $? -eq 0 ]; then
        echo "$IP is reachable" >> "$OUTPUT_FILE"
        
        # Use grep to search for specific patterns in the output (you may need to adjust this based on actual output)
        ping -c 1 "$IP" | grep "$SEARCH_PATTERN" >> "$OUTPUT_FILE"
    fi
done

# Print the results
cat "$OUTPUT_FILE"
