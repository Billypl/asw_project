# Qucik start
To get your raspberry connected as fast as possible:
- rename `.env-example`to `.env` and fill required data
- run:
```bash
cd auto_connect
./setup.sh
./connect.sh
```
For more detailed info see below.

# Setup
Setup requires downlading nodejs and npm packages for web crawling
```bash
cd auto_connect
# nodejs and npm
curl -fsSL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
sudo -E bash nodesource_setup.sh
sudo apt-get install -y nodejs
# npm packages
npm install puppeteer
npm install dotenv
```
# Getting port
To get port simply run
```bash
node getport.js
```
# Connecting to your raspberry
```bash
ssh uk1.pitunnel.net -p $(node getport.js)
```
