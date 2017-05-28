Simple NodeJS application which receives AWS SNS notification via HTTP/HTTPS and sends POST request to targeted Webhook URL

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
$ curl -X POST -H "x-amz-sns-message-type: SubscriptionConfirmation" \
               -d '{ "SubscribeURL": "https://www.example.com" }' \
               http://localhost:3000
```

## Simulate AWS SNS Notification request
```bash
$ curl -X POST -H "x-amz-sns-message-type: Notification" \
               -d '{ "Message": "{ \"Records\": [{ \"customData\": \"https://www.example.com\" }] }" }' \
               http://localhost:3000
```