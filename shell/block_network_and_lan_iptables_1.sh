#!/usr/bin/env bash
set -e

# 0) Hard offline first (best effort; safe to run even on desktops)
nmcli radio all off 2>/dev/null || true
rfkill block all 2>/dev/null || true
for IFACE in $(ip -o link show | awk -F': ' '{print $2}' | grep -E '^(wlan|wl|eth|en|ww)'); do
  ip link set "$IFACE" down 2>/dev/null || true
done

# 1) Stop common remote-access daemons (ignore errors if not present)
systemctl stop --now anydesk teamviewer teamviewerd rustdesk-server rustdesk xrdp xrdp-sesman \
  gnome-remote-desktop x11vnc vino vncserver tigervnc-server ssh sshd chrome-remote-desktop 2>/dev/null || true
systemctl mask anydesk teamviewerd rustdesk-server rustdesk xrdp xrdp-sesman gnome-remote-desktop \
  x11vnc vino vncserver tigervnc-server chrome-remote-desktop 2>/dev/null || true

# 2) Disable IPv6 immediately (runtime)
sysctl -w net.ipv6.conf.all.disable_ipv6=1
sysctl -w net.ipv6.conf.default.disable_ipv6=1

# 3) Drop everything with nftables (preferred on modern Linux)
nft flush ruleset || true
nft add table inet kill
nft add chain inet kill input  '{ type filter hook input  priority 0; policy drop; }'
nft add chain inet kill output '{ type filter hook output priority 0; policy drop; }'
nft add chain inet kill forward '{ type filter hook forward priority 0; policy drop; }'

# 4) If you still use iptables, set default DROP for both IPv4 and IPv6 and flush conntrack
iptables -F || true; iptables -X || true
iptables -P INPUT DROP
iptables -P OUTPUT DROP
iptables -P FORWARD DROP

ip6tables -F || true; ip6tables -X || true
ip6tables -P INPUT DROP
ip6tables -P OUTPUT DROP
ip6tables -P FORWARD DROP

# 5) Bypass conntrack and kill any late packets in raw table (IPv4/IPv6)
iptables  -t raw -F || true
iptables  -t raw -I PREROUTING 1 -j DROP
iptables  -t raw -I OUTPUT     1 -j DROP
ip6tables -t raw -F || true
ip6tables -t raw -I PREROUTING 1 -j DROP
ip6tables -t raw -I OUTPUT     1 -j DROP

# 6) Flush existing connections so “established” flows die
conntrack -F 2>/dev/null || true

# 7) Sanity check
nft list ruleset || true
iptables -S || true
ip6tables -S || true

