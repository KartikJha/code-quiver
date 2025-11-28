#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<EOF
Usage: $0 domain.example.com
Closes all INPUT/OUTPUT/FORWARD traffic (DROP) and allows ONLY TCP/443 to/from the domain's IPs.
EOF
  exit 1
}

if [ "$(id -u)" -ne 0 ]; then
  echo "Run as root (sudo)." >&2
  exit 2
fi

if [ $# -ne 1 ]; then
  usage
fi

DOMAIN="$1"
BACKUP_DIR="/root"
TS="$(date -u +%Y%m%dT%H%M%SZ)"
IPV4_BACKUP="${BACKUP_DIR}/iptables-save-v4-${TS}.bak"
IPV6_BACKUP="${BACKUP_DIR}/ip6tables-save-v6-${TS}.bak"

echo "Backing up current rules..."
iptables-save > "${IPV4_BACKUP}" || { echo "iptables-save failed" >&2; exit 3; }
ip6tables-save > "${IPV6_BACKUP}" || echo "ip6tables-save failed or no IPv6 - continuing..."

echo "Resolving domain ${DOMAIN} (A + AAAA)..."
# Resolve addresses BEFORE changing OUTPUT policy
ADDRS=()
if command -v getent >/dev/null 2>&1; then
  while read -r ip _; do
    # validate non-empty
    [[ -n "$ip" ]] && ADDRS+=("$ip")
  done < <(getent ahosts "$DOMAIN" 2>/dev/null | awk '{print $1}' | sort -u)
fi

# fallback to dig if no results and dig exists
if [ ${#ADDRS[@]} -eq 0 ] && command -v dig >/dev/null 2>&1; then
  mapfile -t A4 < <(dig +short A "$DOMAIN")
  mapfile -t A6 < <(dig +short AAAA "$DOMAIN")
  ADDRS=("${A4[@]}" "${A6[@]}")
fi

if [ ${#ADDRS[@]} -eq 0 ]; then
  echo "ERROR: Could not resolve domain $DOMAIN to any IPs. Aborting." >&2
  exit 4
fi

echo "Resolved the following IPs:"
for ip in "${ADDRS[@]}"; do
  echo "  $ip"
done

read -p $'This will DROP all INPUT/OUTPUT/FORWARD traffic and end established connections (yes/no): ' CONF
if [[ "${CONF,,}" != "yes" ]]; then
  echo "Aborted by user."
  exit 0
fi

# -- attempt to flush conntrack to kill existing connections if conntrack exists --
if command -v conntrack >/dev/null 2>&1; then
  echo "Flushing conntrack table to terminate existing connections..."
  conntrack -F || echo "conntrack -F returned non-zero (continuing)..."
else
  echo "conntrack tool not found; existing conntrack state may persist until packets time out."
fi

# Create temporary custom chains so we can insert rules safely
echo "Building new rule set..."

# Flush current filter table rules (we keep backups above)
iptables -F || true
iptables -X || true
ip6tables -F || true
ip6tables -X || true

# Allow loopback traffic to avoid breaking local IPC/services (change if you want lo blocked)
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT
ip6tables -A INPUT -i lo -j ACCEPT
ip6tables -A OUTPUT -o lo -j ACCEPT

# Allow traffic necessary for server to operate only to/from domain IPs on TCP/443
# IPv4
for ip in "${ADDRS[@]}"; do
  if [[ "$ip" =~ : ]]; then
    continue
  fi
  # Allow incoming packets from domain IP to our TCP port 443 (so domain can connect to us if needed)
  iptables -A INPUT -p tcp -s "${ip}" --dport 443 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT
  # Allow outgoing packets to domain IP TCP port 443 (we as client -> domain)
  iptables -A OUTPUT -p tcp -d "${ip}" --dport 443 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT
  # Allow return packets (just in case)
  iptables -A INPUT -p tcp -s "${ip}" --sport 443 -m conntrack --ctstate ESTABLISHED -j ACCEPT
  iptables -A OUTPUT -p tcp -d "${ip}" --sport 443 -m conntrack --ctstate ESTABLISHED -j ACCEPT || true
done

# IPv6
for ip in "${ADDRS[@]}"; do
  if [[ "$ip" =~ : ]]; then
    # Allow incoming from domain IPv6 to our TCP/443
    ip6tables -A INPUT -p tcp -s "${ip}" --dport 443 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT
    # Allow outgoing to domain IPv6 TCP/443
    ip6tables -A OUTPUT -p tcp -d "${ip}" --dport 443 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT
    ip6tables -A INPUT -p tcp -s "${ip}" --sport 443 -m conntrack --ctstate ESTABLISHED -j ACCEPT
    ip6tables -A OUTPUT -p tcp -d "${ip}" --sport 443 -m conntrack --ctstate ESTABLISHED -j ACCEPT || true
  fi
done

# IMPORTANT: Allow return traffic for established connections for the allowed flows above by permitting RELATED,ESTABLISHED generally.
# But we will limit RELATED,ESTABLISHED to traffic which matches connections tracked by conntrack.
iptables -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
ip6tables -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
ip6tables -A OUTPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT

# Now block everything else (no ICMP, no DNS, no SSH by default)
iptables -P INPUT DROP
iptables -P OUTPUT DROP
iptables -P FORWARD DROP

ip6tables -P INPUT DROP
ip6tables -P OUTPUT DROP
ip6tables -P FORWARD DROP

echo "All default policies set to DROP. Only TCP/443 to/from the resolved domain IPs (and loopback) are allowed."

echo
echo "Backups:"
echo "  IPv4 rules backup: ${IPV4_BACKUP}"
echo "  IPv6 rules backup: ${IPV6_BACKUP}"
echo
cat <<EOF
RESTORATION:
  To restore previous rules:
    sudo iptables-restore < ${IPV4_BACKUP}
    sudo ip6tables-restore < ${IPV6_BACKUP}   # if you had IPv6

NOTES:
  - If you need SSH, add an allow rule for your IP BEFORE running this script.
  - This script resolves the domain once. If domain IPs change, re-run to update rules.
EOF

exit 0
