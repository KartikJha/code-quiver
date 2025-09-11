#!/usr/bin/env bash
set -e

# ==== CONFIG: update these ====
GATEWAY="192.168.0.1"

ALLOWED_IPV4=(
  "140.82.112.0/20"     # GitHub
  "143.55.64.0/20"      # GitHub
  "185.199.108.0/22"    # GitHub
  "192.30.252.0/22"     # GitHub
  "208.103.161.0/24"    # Notion
  # Example Google ranges (update as needed)
  "216.58.192.0/19"
  "172.217.0.0/19"
)

ALLOWED_IPV6=(
  "2602:f79a::/48"      # Notion
  # Add Google IPv6 etc
)

selective_on() {
  echo "[*] Activating selective HTTPS allow mode"

  # Allow only HTTPS outbound to allowed IPv4 ranges
  for ip in "${ALLOWED_IPV4[@]}"; do
    iptables -A OUTPUT -p tcp --dport 443 -d $ip -j ACCEPT
  done

  # Allow IPv6 HTTPS outbound to allowed IPv6 ranges
  for ip in "${ALLOWED_IPV6[@]}"; do
    ip6tables -A OUTPUT -p tcp --dport 443 -d $ip -j ACCEPT
  done

  # Allow communication with gateway (adjust to your router IP)
  iptables -A OUTPUT -d $GATEWAY -j ACCEPT
  iptables -A INPUT -s $GATEWAY -j ACCEPT

  echo "[*] Selective HTTPS-only mode enabled"
}

# Call function immediately when script runs
selective_on
