FROM node:20-slim

WORKDIR /usr/src/unlimit-service

EXPOSE 3000

COPY package.json .

# Install PM2
RUN npm install -g pm2

RUN npm install --force

COPY . .

