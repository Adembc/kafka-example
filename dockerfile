FROM node:16.20-bullseye

WORKDIR /app

COPY package.json ./

RUN npm i -g nodemon

RUN npm install

COPY consumer.js consumer.js

ENTRYPOINT ["nodemon", "./consumer.js"]