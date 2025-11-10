#!/usr/bin/env bash
set -euo pipefail

# This script blocks ALL network traffic (IPv4 & IPv6), inbound and outbound,
# including established/related connections and LAN. Loopback is kept so the OS stays stable.
# To undo, see the restore section at the end.

echo "[*] Flushing existing rules and setting policies to DROP..."

# IPv4: flush and set policy DROP
iptables -F
iptables -X
iptables -Z
iptables -P INPUT DROP
iptables -P OUTPUT DROP
iptables -P FORWARD DROP

# IPv6: flush and set policy DROP
ip6tables -F
ip6tables -X
ip6tables -Z
ip6tables -P INPUT DROP
ip6tables -P OUTPUT DROP
ip6tables -P FORWARD DROP

echo "[*] Allow minimal loopback for local processes..."
iptables  -A INPUT  -i lo -j ACCEPT
iptables  -A OUTPUT -o lo -j ACCEPT
ip6tables -A INPUT  -i lo -j ACCEPT
ip6tables -A OUTPUT -o lo -j ACCEPT

echo "[*] Explicitly drop established/related to ensure total isolation..."
iptables  -A INPUT  -m conntrack --ctstate ESTABLISHED,RELATED -j DROP
iptables  -A OUTPUT -m conntrack --ctstate ESTABLISHED,RELATED -j DROP
ip6tables -A INPUT  -m conntrack --ctstate ESTABLISHED,RELATED -j DROP
ip6tables -A OUTPUT -m conntrack --ctstate ESTABLISHED,RELATED -j DROP

echo "[*] Drop all common L3/L4 protocols (redundant with policy DROP, but explicit)..."
for proto in tcp udp icmp gre esp ah sctp dccp; do
  iptables  -A INPUT  -p "$proto" -j DROP || true
  iptables  -A OUTPUT -p "$proto" -j DROP || true
done
# IPv6 ICMP explicitly
ip6tables -A INPUT  -p ipv6-icmp -j DROP
ip6tables -A OUTPUT -p ipv6-icmp -j DROP
# Also drop TCP/UDP explicitly on IPv6
ip6tables -A INPUT  -p tcp -j DROP
ip6tables -A OUTPUT -p tcp -j DROP
ip6tables -A INPUT  -p udp -j DROP
ip6tables -A OUTPUT -p udp -j DROP

echo "[*] Final rules summary:"
iptables -S
ip6tables -S

cat <<'EOT'

[✓] Total network isolation is now active.
    - ALL inbound/outbound IPv4/IPv6 is blocked
    - ESTABLISHED/RELATED flows are blocked
    - LAN access is blocked
    - Only loopback (lo) is allowed

Restore (re-enable networking) with:
  sudo iptables -F
  sudo ip6tables -F
  sudo iptables -P INPUT ACCEPT
  sudo ip6tables -P INPUT ACCEPT
  sudo iptables -P OUTPUT ACCEPT
  sudo ip6tables -P OUTPUT ACCEPT
  sudo iptables -P FORWARD ACCEPT
  sudo ip6tables -P FORWARD ACCEPT

Optional ultra-airgap (also brings down interfaces except lo):
  for IF in $(ls /sys/class/net | grep -v '^lo$'); do sudo ip link set "$IF" down; done

EOT
