if [ "$(id -u)" -eq 0 ]
  then echo "Please run as user"
  exit
fi

sudo groupadd docker
echo "Adding $USER to group 'docker'"
sudo usermod -aG docker $USER

read -p "Press any key to restart system $*"
shutdown -r now