FROM node:14-alpine
WORKDIR /user/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 80

CMD [ "node", "server.js" ]