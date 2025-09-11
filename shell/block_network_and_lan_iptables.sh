#!/usr/bin/env bash
set -e

# ---- CONFIG ----
LAN_SUBNET="192.168.0.0/24"   # Your LAN subnet
GATEWAY="192.168.0.1"         # Your access point IP
LAN6_SUBNET="fe80::/10"       # Typical IPv6 link-local subnet
# ----------------

echo "[*] Setting default DROP policies..."
iptables -P INPUT DROP
iptables -P OUTPUT DROP
iptables -P FORWARD DROP
ip6tables -P INPUT DROP
ip6tables -P OUTPUT DROP
ip6tables -P FORWARD DROP

echo "[*] Allow loopback and established connections..."
iptables  -A INPUT  -i lo -j ACCEPT
iptables  -A OUTPUT -o lo -j ACCEPT
ip6tables -A INPUT  -i lo -j ACCEPT
ip6tables -A OUTPUT -o lo -j ACCEPT

iptables  -A INPUT  -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables  -A OUTPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
ip6tables -A INPUT  -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
ip6tables -A OUTPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

echo "[*] Blocking ICMP (IPv4/IPv6)..."
iptables  -A INPUT  -p icmp -j DROP
iptables  -A OUTPUT -p icmp -j DROP
ip6tables -A INPUT  -p ipv6-icmp -j DROP
ip6tables -A OUTPUT -p ipv6-icmp -j DROP

echo "[*] Blocking other network layer protocols..."
for proto in gre esp ah sctp dccp; do
    iptables  -A INPUT  -p $proto -j DROP
    iptables  -A OUTPUT -p $proto -j DROP
    ip6tables -A INPUT  -p $proto -j DROP
    ip6tables -A OUTPUT -p $proto -j DROP
done

echo "[*] Blocking all other LAN nodes except gateway..."
# Block inbound/outbound to the LAN subnet
iptables -A INPUT  -s $LAN_SUBNET ! -s $GATEWAY -j DROP
iptables -A OUTPUT -d $LAN_SUBNET ! -d $GATEWAY -j DROP

# IPv6 link-local blocking (blocks other hosts on same L2 segment)
ip6tables -A INPUT  -s $LAN6_SUBNET -j DROP
ip6tables -A OUTPUT -d $LAN6_SUBNET -j DROP

echo "[*] Allow only gateway and internet-bound connections..."
# Allow outbound to gateway (adjust ports as needed)
iptables -A OUTPUT -d $GATEWAY -j ACCEPT
iptables -A INPUT  -s $GATEWAY -j ACCEPT

echo "[*] Allow DNS (UDP 53), HTTP (80), HTTPS (443) outbound if needed..."
iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 80 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 443 -j ACCEPT

echo "[*] Current IPv4 rules:"
iptables -L -v -n
echo "[*] Current IPv6 rules:"
ip6tables -L -v -n
