#!/bin/bash

# Configuration
LATENCY_THRESHOLD=100  # milliseconds - adjust as needed
CHECK_INTERVAL=5       # seconds between checks
RESET_RETRY_INTERVAL=3 # seconds - how long to wait before trying to reset after blocking
BLOCK_SCRIPT="./block_network_and_lan_iptables.sh"
RESET_SCRIPT="./reset_firewall_iptables.sh"

# State tracking
CURRENT_STATE="open"  # start assuming connection is open
LAST_BLOCK_TIME=0     # timestamp of last block action

# Function to get ping latency
get_ping_latency() {
    local latency
    # Ping once and extract the time value
    latency=$(ping -c 1 -W 2 google.com 2>/dev/null | grep 'time=' | sed -n 's/.*time=\([0-9.]*\).*/\1/p')
    
    if [ -z "$latency" ]; then
        echo "-1"  # Return -1 if ping failed
    else
        # Return latency rounded to integer
        printf "%.0f" "$latency"
    fi
}

# Function to block network
block_network() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Blocking network..."
    sudo "$BLOCK_SCRIPT"
    CURRENT_STATE="blocked"
    LAST_BLOCK_TIME=$(date +%s)
}

# Function to reset/open network
reset_network() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Opening network..."
    sudo "$RESET_SCRIPT"
    CURRENT_STATE="open"
}

# Main monitoring function
monitor_network_latency() {
    echo "Starting network latency monitor..."
    echo "Latency threshold: ${LATENCY_THRESHOLD}ms"
    echo "Check interval: ${CHECK_INTERVAL}s"
    echo "Reset retry interval: ${RESET_RETRY_INTERVAL}s"
    echo "Press Ctrl+C to stop"
    echo "---"
    
    while true; do
        latency=$(get_ping_latency)
        current_time=$(date +%s)
        time_since_block=$((current_time - LAST_BLOCK_TIME))
        
        if [ "$latency" -eq -1 ]; then
            echo "[$(date '+%Y-%m-%d %H:%M:%S')] Ping failed - network may be blocked or unreachable"
            
            if [ "$CURRENT_STATE" = "open" ]; then
                echo "  Network was open, blocking due to ping failure..."
                block_network
            elif [ "$CURRENT_STATE" = "blocked" ] && [ "$time_since_block" -ge "$RESET_RETRY_INTERVAL" ]; then
                echo "  Network blocked for ${time_since_block}s, attempting to reset and test..."
                reset_network
            fi
        else
            echo "[$(date '+%Y-%m-%d %H:%M:%S')] Latency: ${latency}ms (State: $CURRENT_STATE)"
            
            if [ "$latency" -gt "$LATENCY_THRESHOLD" ]; then
                if [ "$CURRENT_STATE" = "open" ]; then
                    echo "  High latency detected! Blocking network..."
                    block_network
                fi
            else
                if [ "$CURRENT_STATE" = "blocked" ]; then
                    echo "  Latency normal. Keeping network open..."
                    CURRENT_STATE="open"
                fi
            fi
        fi
        
        sleep "$CHECK_INTERVAL"
    done
}

# Run the monitor
monitor_network_latency
