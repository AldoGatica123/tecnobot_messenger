const request = require('request')
const dialogflow = require('@google-cloud/dialogflow');
const responses_ = require('./responses');


const runQuery = async (received_message, sender_psid) => {
  const projectId = process.env.GCP_PROJECT_ID

  const sessionClient =  new dialogflow.SessionsClient({
    projectId,
    keyFilename: "./credentials/tecnobot-skatrn-3255a66c9c97.json",
  });
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sender_psid);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: received_message.text,
        languageCode: 'es',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  console.log('Response: ' + JSON.stringify(responses[0].queryResult));
  return responses_.handleResponse(responses[0].queryResult);
}

const handleMessage = async (res, sender_psid, received_message) => {
  let response;

  if (received_message.text) {
    response = await runQuery(received_message, sender_psid)
  }
  callSendAPI(res, sender_psid, response);
}

const handlePostback = (res, sender_psid, received_postback) => {
  console.log('ok')
  let response;
  let payload = received_postback.payload;

  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  callSendAPI(res, sender_psid, response);
}

const callSendAPI = (res, sender_psid, response) => {
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, response, body) => {
    if (!err) {
      console.log('message sent!');
      res.status(200).send('MESSAGE SENT');
    } else {
      console.error("Unable to send message:" + err);
      res.status(500).send('UNABLE TO SEND MESSAGE');
    }
  });
}

exports.handleMessage = handleMessage;
exports.handlePostback = handlePostback;