FROM node:latest

WORKDIR /messenger

COPY package.json ./package.json

RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "server.js"]
