
const minLengthReached = () => {
  return {text: "Por favor, ingresa tus datos con más de 2 letras"}
}

const maxLengthReached = () => {
  return {text: "Por favor, ingresa tus datos con menos de 30 letras"}
}

const handleResponse = (result) => {
  let response = '';
  const intent_prefix = result.intent.displayName.slice(0, 2);
  switch (intent_prefix) {
    case '01':
      response = welcomeMessage();
      break;
    case '02':
      response = helpMessage();
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
    else {
      console.log("Save: " + fields[key].stringValue)
    }
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

const helpMessage = () => {
  return {
    text: "Te puedo asistir con las siguientes opciones:",
    quick_replies:[
      {
        content_type:"text",
        title:"Quiero hablar con un humano",
        payload:"human",
      },{
        content_type:"text",
        title:"Iniciar campaña de marketing",
        payload:"init_campaign",
      },{
        content_type:"text",
        title:"Completar pago de campañas de marketing",
        payload:"finish_payment",
      }
    ]
  }
}

exports.minLengthReached = minLengthReached;
exports.maxLengthReached = maxLengthReached;
exports.handleResponse = handleResponse;