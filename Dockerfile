FROM node:15-alpine

COPY /src/frontend/package*.json ./app/frontend/
COPY /src/package*.json ./app/

COPY ./src /app/

WORKDIR /app

RUN npm install && cd .. && cd /app/frontend && npm install && npm run build

WORKDIR /app
CMD [ "node", "server.js" ]