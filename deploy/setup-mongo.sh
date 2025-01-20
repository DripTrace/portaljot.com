#!/bin/sh

# Generate the key and save it directly to file
openssl rand -base64 768 | sudo tee mongo-keyfile > /dev/null

# Set correct ownership
sudo chown do-agent:systemd-journal mongo-keyfile

# Set correct permissions (read-only for owner)
sudo chmod 400 mongo-keyfile
