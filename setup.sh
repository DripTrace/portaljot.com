#!/bin/sh

sudo install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev pkg-config -y

sudo apt install ca-certificates curl gnupg -y && sudo install -m 0755 -d /etc/apt/keyrings && curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg && sudo chmod a+r /etc/apt/keyrings/docker.gpg && sudo echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(. /etc/os-release && sudo echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && sudo apt update && sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y 

# && username=rpalm && adduser $username && cp -a /etc/skel/. /home/$username && chown -R $username:$username /home/$username && usermod -a -G plugdev,sudo,video,docker $username && su rpalm

curl -O https://repo.anaconda.com/archive/Anaconda3-2024.10-1-Linux-x86_64.sh

bash Anaconda3-2024.10-1-Linux-x86_64.sh

eval "$(/home/rpalm/anaconda3/bin/conda shell.bash hook)"

conda deactivate

conda init

conda create -n portaljot.com python=3.13

conda activate portaljot.com