const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const URL = require('url');

app.use(bodyParser.json({ "type": "*/*"}))

const get = function(url, callback) {
  const http = url.startsWith('https') ? require('https') : require('http');
  return http.get(url, callback);
}

const post = function(url, success, error) {
  const http = url.startsWith('https') ? require('https') : require('http');
  url = URL.parse(url);
  const req = http.request({
    hostname: url.hostname,
    port: url.port,
    path: url.path,
    method: 'POST',
    rejectUnauthorized: false
  }, success).on('error', error);
  req.end();
}

app.post('/', function (req, res) {  
  var snsType = req.headers['x-amz-sns-message-type'];
  
  const success = (e) => res.send("OK");
  const error = (e) => res.json(e);

  if (snsType == 'SubscriptionConfirmation') {
    url = req.body.SubscribeURL;
    get(url, success, error);
  } else if (snsType == 'Notification') {
    var message = JSON.parse(req.body.Message);
    url = message.Records[0].customData;
    post(url, success, error);
  } else {
    res.send("");
  }
})

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Webhook listening on port ${port}!`)
})

// Required to handle CTRL+C
process.on('SIGINT', function() {
    process.exit();
});