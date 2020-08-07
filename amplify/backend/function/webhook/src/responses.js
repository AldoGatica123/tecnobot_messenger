
const handleResponse = (result) => {
  var response = ''
  switch (result.intent.displayName) {
    case '01.welcome':
      response = welcomeMessage();
      break;
    default:
      response = {"text": result.fulfillmentText};
  }
  return response;
}

const welcomeMessage = () => {
  return {
    "text": "Hola! Soy Tecnobot, en qué te puedo ayudar?",
    "quick_replies":[
      {
        "content_type":"text",
        "title":"Hablar con un humano",
        "payload":"human",
      },{
        "content_type":"text",
        "title":"Iniciar campaña",
        "payload":"init_campaign",
      },{
        "content_type":"text",
        "title":"Completar pagos",
        "payload":"finish_payment",
      }
    ]
  }
}


exports.handleResponse = handleResponse;