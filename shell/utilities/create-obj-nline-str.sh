# start
ip=$1
user_prefix=kartik.jha@
ssh -il ~/.ssh/id_rsa $user_prefix$ip ""

tmux
pm2 ls
tmux split-window