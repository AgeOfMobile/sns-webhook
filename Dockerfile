FROM node:alpine

ADD . /webhook
WORKDIR /webhook

RUN npm install

EXPOSE 3000
ENTRYPOINT ["node", "/webhook/app.js"]
