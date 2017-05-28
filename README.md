Simple NodeJS application which receive AWS SNS notificaiton via HTTP/HTTPS and send request to targeted Webhook URL

## Build
```
$ cd sns-webhook 
$ npm install
```

## Run
```
$ node app.js
```

## Simulate AWS SNS Confirmation request
```bash
$ curl -X POST -H "Content-Type: application/json" \
               -H "x-amz-sns-message-type: SubscriptionConfirmation" \
               -d '{ "SubscribeURL": "https://www.google.com"}' \
               http://localhost:3000
```

## Simulate AWS SNS Notification request
```bash
$ curl -X POST -H "Content-Type: application/json" \
               -H "x-amz-sns-message-type: Notification" \
               -d '{ "Webhook": "https://www.google.com"}' \
               http://localhost:3000
```