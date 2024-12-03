#!/bin/bash

# nodejs and npm
curl -fsSL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
sudo -E bash nodesource_setup.sh
sudo apt-get install -y nodejs
# npm packages
npm install puppeteer
npm install dotenv