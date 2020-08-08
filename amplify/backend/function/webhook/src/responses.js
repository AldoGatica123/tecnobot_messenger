
const handleResponse = (result) => {
  let response = '';
  const intent_prefix = result.intent.displayName.slice(0, 2);
  switch (intent_prefix) {
    case '01':
      response = welcomeMessage();
      break;
    case '03':
      response = handleCampaign(result);
      break;
    default:
      response = {text: result.fulfillmentText};
  }
  return response;
}

const handleCampaign = (result) => {
  const fields = result.parameters.fields;
  Object.keys(fields).forEach((key) =>  {
    console.log("Parameter: " + key)
    if (key === "location"){
      const location = fields[key].structValue;
      console.log("Save: " + location.fields.country.stringValue)
    }
    console.log("Save: " + fields[key].stringValue)
  });
  return {text: result.fulfillmentText};
}



const welcomeMessage = () => {
  return {
    text: "Hola! Soy Tecnobot, en qué te puedo ayudar?",
    quick_replies:[
      {
        content_type:"text",
        title:"Hablar con un humano",
        payload:"human",
      },{
        content_type:"text",
        title:"Iniciar campaña",
        payload:"init_campaign",
      },{
        content_type:"text",
        title:"Completar pagos",
        payload:"finish_payment",
      }
    ]
  }
}


exports.handleResponse = handleResponse;