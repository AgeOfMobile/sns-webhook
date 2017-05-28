Simple NodeJS application which receives AWS SNS notification via HTTP/HTTPS and sends request to targeted Webhook URL

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
               -d '{ "SubscribeURL": "https://www.google.com"}' \
               http://localhost:3000
```

## Simulate AWS SNS Notification request
```bash
$ curl -X POST -H "x-amz-sns-message-type: Notification" \
               -d '{ "Message": "{ Requests: [{ customData: "https://ec2-52-54-231-84.compute-1.amazonaws.com:8443/oapi/v1/namespaces/piexchange/buildconfigs/transaction-service/webhooks/genericsecret/generic" }] }" }' \
               http://localhost:3000               
```