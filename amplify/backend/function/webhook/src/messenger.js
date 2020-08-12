const request = require('request')
const responses_ = require('./responses');


const handleMessage = (res, sender_psid, received_message) => {
  let responses;

  if (received_message.text) {
    responses = responses_.handleResponse(received_message.text);
  }
  else if (received_message.attachments) {
    let attachment_url = received_message.attachments[0].payload.url;
    responses = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Yes!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "No!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
  }

  handleResponses(res, sender_psid, responses);
}

const handlePostback = (res, sender_psid, received_postback) => {
  let responses;
  const payload = received_postback.payload;
  console.log(payload)

  switch (payload) {
    case 'get_started':
      responses = responses_.welcomeMessage();
      break;
    case 'help':
      responses = responses_.helpMessage();
      break;
    case 'talk_human':
      responses = responses_.talkHuman()
      break;
    case 'init_campaign':
      responses = responses_.initCampaign()
      break;
    default:
      responses = responses_.welcomeMessage()
      break
  }
  if (payload === 'yes') {
    responses = { "text": "Thanks!" }
  } else if (payload === 'no') {
    responses = { "text": "Oops, try sending another image." }
  }
  handleResponses(res, sender_psid, responses);
}


const handleResponses = (res, sender_psid, responses) => {
  if (Array.isArray(responses)) {
    let delay = 0;
    for (i = 0; i < responses.length - 1; i++){
      const response = responses[i];
      sendMessage(res, sender_psid, response, false, delay * 2500);
      delay++;
    }
    const last = responses[responses.length-1];
    sendMessage(res, sender_psid, last, true, delay * 2500);
  }
  else {
    sendMessage(res, sender_psid, responses, true);
  }
}

const sendMessage = (res, sender_psid, response, last, delay = 0) => {
  if ("delay" in response) {
    delay = response["delay"];
    delete response["delay"];
  }
  setTimeout(async() => await callSendAPI(res, sender_psid, response, last), delay);
}

const callSendAPI = (res, sender_psid, response, last) => {
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
      if (last){
        res.status(200).send({message: "SENDING MESSAGE"});
      }
      console.log(request_body);
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

exports.handleMessage = handleMessage;
exports.handlePostback = handlePostback;