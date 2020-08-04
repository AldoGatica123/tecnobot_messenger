const request = require('request')

const handleMessage = (res, sender_psid, received_message) => {
  let response;

  if (received_message.text) {
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
    }
  } else if (received_message.attachments) {
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
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