const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const messenger = require('./messenger')

const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.get('/', (req, res) => {
  res.json({success: 'Webhook service online'});
});

app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    }
    else {
      res.sendStatus(403);
    }
  }
});

app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      const webhook_event = entry.messaging[0];
      console.log(webhook_event);

      const sender_psid = webhook_event.sender.id;
      console.log('Sender ID: ' + sender_psid);

      if (webhook_event.message) {
        messenger.handleMessage(res, sender_psid, webhook_event.message);
      }
      else if (webhook_event.postback) {
        messenger.handlePostback(res, sender_psid, webhook_event.postback);
      }
    });
  }
  else {
    res.sendStatus(404);
  }
});


app.listen(3000, function() {
    console.log("Amplify Express app started")
});


module.exports = app
