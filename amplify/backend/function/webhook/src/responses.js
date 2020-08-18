const handleResponse = (message) => {
  return {text: "You said " + message + ". passing to a human..."};
}

const welcomeMessage = () => {
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "Hola! Soy Tecnobot, en qué te puedo ayudar?",
        buttons: [
          {
            type: "postback",
            title: "Hablar con un humano",
            payload: "talk_human"
          },
          {
            type: "postback",
            title: "Campaña de marketing",
            payload: "init_campaign"
          },
          {
            type: "postback",
            title: "Pagar campaña",
            payload: "complete_payment"
          },
        ]
      }
    }
  }
}

const helpMessage = () => {
  return {
    text: "Te puedo asistir con las siguientes opciones:",
    quick_replies: [
      {
        content_type: "text",
        title: "Quiero hablar con un humano",
        payload: "talk_human",
      }, {
        content_type: "text",
        title: "Iniciar campaña de marketing",
        payload: "init_campaign",
      }, {
        content_type: "text",
        title: "Completar pago de campañas de marketing",
        payload: "complete_payment",
      }
    ]
  }
}

const initCampaign = () => {
  return [{
    text: "Para iniciar una campaña nueva te pediré unos datos."
  }, {
    text: "Cuál es el nombre de tu empresa?"
  }]
}

const talkHuman = () => {
  return { text: "En un momento te atenderá un operador!" }
}

const completePayment = () => {
  return { text: "Cuál es tu número de transacción?" }
}

const nextFieldRequired = (psid, message, current_field, next_field) => {
  return [{text: "Saving " + message + " in " + current_field + ". Conversation: " + psid},
          {text: "Ask for " + next_field}]
}

const finishedCampaignQuestions = () => {
  return {text: "Thats it!"};
}


exports.initCampaign = initCampaign;
exports.talkHuman = talkHuman;
exports.helpMessage = helpMessage;
exports.welcomeMessage = welcomeMessage;
exports.handleResponse = handleResponse;
exports.completePayment = completePayment;
exports.nextFieldRequired = nextFieldRequired;
exports.finishedCampaignQuestions = finishedCampaignQuestions;