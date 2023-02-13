if [ "$EUID" -eq 0 ]
  then echo "Please run as user"
  exit
fi

groupadd docker
usermod -aG docker $USER

read -p "Press any key to restart system $*"
shutdown -r now