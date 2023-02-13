groupadd docker
usermod -aG docker $USER

read -p "Press any key to restart system $*"
shutdown -r now