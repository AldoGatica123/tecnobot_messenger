const request = require('request')
const responses_ = require('./responses');


const handleMessage = (sender_psid, received_message) => {
  let responses;

  if (received_message.text) {
    responses = responses_.handleResponse(received_message.text);
  }

  handleResponses(sender_psid, responses);
}

const handlePostback = (sender_psid, received_postback) => {
  let responses;
  const payload = received_postback.payload;
  console.log(payload)

  switch (payload) {
    case 'GET_STARTED':
      responses = responses_.welcomeMessage();
      break;
    case 'HELP':
      responses = responses_.helpMessage();
      break;
    case 'TALK_HUMAN':
      responses = responses_.talkHuman()
      break;
    case 'INIT_CAMPAIGN':
      responses = responses_.initCampaign()
      break;
    default:
      responses = responses_.welcomeMessage()
      break
  }
  handleResponses(sender_psid, responses);
}

const handleReferral = (referral) => {
  let payload = referral.ref.toUpperCase();
  console.log(payload)

  return [payload]
}

const handleResponses = (sender_psid, responses) => {
  if (Array.isArray(responses)) {
    let delay = 0;
    for (const response of responses) {
      sendMessage(sender_psid, response, delay * 2500);
      delay++;
    }
  }
  else {
    sendMessage(sender_psid, responses);
  }
}

const sendMessage = (sender_psid, response, delay = 0) => {
  if ("delay" in response) {
    delay = response["delay"];
    delete response["delay"];
  }
  setTimeout(() => callSendAPI(sender_psid, response), delay);
}

const callSendAPI = (sender_psid, response) => {
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": JSON.stringify(response)
  }

  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, response, body) => {
    if (!err) {
      console.log(request_body);
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

exports.handleMessage = handleMessage;
exports.handlePostback = handlePostback;
exports.handleReferral = handleReferral;