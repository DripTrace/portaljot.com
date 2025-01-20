#!/bin/bash

# start-dev-servers.sh
echo "Starting all development servers..."

yarn dev:driptrace &
yarn dev:llpmg &
yarn dev:fsclinicals &
yarn dev:accessmentalhealth &
yarn dev:advancedpractice &

wait