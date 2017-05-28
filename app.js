const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const get = function(url, callback) {
  const http = url.startsWith('https') ? require('https') : require('http');
  return http.get(url, callback);
}

app.post('/', function (req, res) {
  console.log("Received: {}", req.body);  
  var snsType = req.headers['x-amz-sns-message-type'];
  var url = '';
  if (snsType == 'SubscriptionConfirmation') {
    url = req.body.SubscribeURL;
  } else if (snsType == 'Notification') {
    url = req.body.Webhook;
  } 

  if (url != '') {
    get(url, () => res.send("OK"))
      .on('error', (e) => res.send("FAILED: " + e.message));
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