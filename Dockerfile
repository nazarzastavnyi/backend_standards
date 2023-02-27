FROM --platform=linux/amd64 node:15-alpine

WORKDIR /app
COPY . .

RUN npm install

CMD [ "npm", "start" ]