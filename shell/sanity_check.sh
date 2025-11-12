# Should show basically nothing (besides maybe ARP/lo)
#tcpdump -i any -vv -n not lo -c 50
# No remote desktop or suspicious sockets should remain
ss -tupn
ss -uapn
ps aux | egrep -i 'vnc|xrdp|anydesk|teamviewer|rustdesk|chrome-remote|gnome-remote|webrtc|remotedesktop'

tcpdump -i any -vv -n   
