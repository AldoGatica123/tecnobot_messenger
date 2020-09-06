const notRecognized = (message) => {
  return [{text: "No entendí '" + message + "'"}, helpMessage()];
}

const welcomeMessage = () => {
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "¡Hola, bienvenido al Sistema automatizado para que crear campañas publicitarias en medios digitales.",
        buttons: [
          {
            type: "postback",
            title: "Hablar con un asesor",
            payload: "talk_human"
          },
          {
            type: "postback",
            title: "Crear campaña",
            payload: "init_campaign"
          },
          {
            type: "postback",
            title: "Pagar publicidad",
            payload: "complete_payment"
          },
        ]
      }
    }
  }
}

const helpMessage = () => {
  return {
    attachment: {
      type: "template",
        payload: {
        template_type: "button",
          text: "Te puedo asistir con las siguientes opciones:",
          buttons: [
            {
              type: "postback",
              title: "Hablar con un asesor",
              payload: "talk_human"
            },
            {
              type: "postback",
              title: "Crear campaña",
              payload: "init_campaign"
            },
            {
              type: "postback",
              title: "Pagar publicidad",
              payload: "complete_payment"
            },
        ]
      }
    }
  }
}

const initCampaign = () => {
  return [{
    text: "Por favor selecciona el paquete que mejor se adapte a tu presupuesto de publicidad."
  }, marketingCombos()]
}

const talkHuman = () => {
  return { text: "Por favor indicanos tu nombre, número de teléfono y correo electrónico para que un asesor se pueda comunicar contigo." }
}

const completePayment = () => {
  return { text: "Cuál es tu número de transacción?" }
}

const nextFieldRequired = (next_field, marketing_package) => {
  console.log("Next field: " + next_field)
  switch (next_field) {
    case 'marketing_package':
      return [{text: "Por favor selecciona el paquete que mejor se adapte a tu presupuesto de publicidad."}, marketingCombos()]
    case 'business_name':
      return {text: "Para comenzar necesitamos información de tu negocio. ¿Cuál es el nombre de tu empresa?"}
    case 'website':
      return {text: "¡Gracias! ¿Cuál es el link hacia tu sitio web? (Si no tienes sitio web puedes utilizar el link de tu página de Facebook.)"}
    case 'location':
      return { text: "¿En dónde se encuentra ubicado tu negocio? Esto nos sirve para poder segmentar tu campaña.", quick_replies: countryList()};
    case 'phone':
      return {text: "Ingresa el número de teléfono para que puedas recibir llamadas de clientes interesados"}
    case 'search_terms':
      return {text: "¿Cuáles son los servicios o productos principales de tu empresa?"}
    case 'description':
      return {text: "Perfecto, ahora necesito que puedas darnos una pequeña descripción de tu negocio en menos de 30 caracteres."}
    case 'slogan':
      return {text: "¿Cuál es el slogan o frase de tu negocio? Necesitamos que sea menos de 30 caracteres"}
    case 'history':
      return {text: "Cuéntanos la historia de tu negocio en menos de 90 caracteres"}
    case 'transaction_number':
      return finishedCampaignQuestions(marketing_package);
  }
}

const countryList = () => {
  return [
      {
        "content_type":"text",
        "title":"Guatemala",
        "payload":"country",
      },{
        "content_type":"text",
        "title":"Mexico",
        "payload":"country",
      },{
        "content_type":"text",
        "title":"Honduras",
        "payload":"country",
      },{
        "content_type":"text",
        "title":"El Salvador",
        "payload":"country",
      },{
        "content_type":"text",
        "title":"Nicaragua",
        "payload":"country",
      },{
        "content_type":"text",
        "title":"Costa Rica",
        "payload":"country",
      },{
        "content_type":"text",
        "title":"Panamá",
        "payload":"country",
      },{
        "content_type":"text",
        "title":"Colombia",
        "payload":"country",
      }
    ]
}

const errorInField = (field) => {
  console.log("Error in field: " + field)
  switch (field) {
    case 'business_name':
      return {text: "Esperamos que el nombre de la empresa sea entre 3 a 15 letras."}
    case 'marketing_package':
      return {text: "Si deseas cambiar el combo de marketing elegido comunicate con un asesor."}
    case 'website':
      return {text: "Por favor, revisa que hayas escrito bien tu sitio web."}
    case 'location':
      return {text: "Por favor, elige una de las posibles ubicaciones.", quick_replies: countryList()}
    case 'phone':
      return {text: "Esperamos que el número de teléfono sea de 8 dígitos."}
    case 'search_terms':
      return {text: "¿Cuáles son los servicios o productos principales de tu empresa?"}
    case 'description':
      return {text: "Por favor, revisa que la descripción de tu negocio sea menor a 30 caracteres."}
    case 'slogan':
      return {text: "Por favor, revisa que el slogan de tu negocio sea menor a 30 caracteres."}
    case 'history':
      return {text: "Por favor, revisa que la historia de tu negocio sea menor 90 caracteres."}
    case 'transaction_number':
      return {text: "Tu número de transacción no es válido."}
  }
}

const finishedCampaignQuestions = (marketing_package) => {
  let payment_link = '';
  switch (marketing_package) {
    case 'MARKETING_COMBO_1':
      payment_link = 'http://sf.pago.ai/tecnometro-sa?token=ZDN0bKIV9o';
      break;
    case 'MARKETING_COMBO_2':
      payment_link = 'http://sf.pago.ai/tecnometro-sa?token=4D9OWIINSq';
      break;
    case 'MARKETING_COMBO_3':
      payment_link = 'http://sf.pago.ai/tecnometro-sa?token=C7wNrrAcR8';
      break;
  }
  return [{text: "Muchas gracias por la información. ¡Estamos listos para lanzar tu campaña publicitaria! " +
      "Ingresa al siguiente enlace para realizar el pago de tu campaña publicitaria:"}, {text: payment_link},
    {text: "Una vez hayas realizado el pago, pega el número de transacción que recibirás por correo electrónico."}];
}

const marketingCombos = () => {
  return {
    attachment: {
      type: "template",
      payload: {
        "template_type": "generic",
        "elements": [
          {
            "title": "Combo de Marketing 1",
            "image_url": "https://user-images.githubusercontent.com/10179447/90703755-d60fb680-e24b-11ea-8ad0-2ba9e4d9c16b.png",
            "subtitle": "GTQ 780.00",
            "buttons": [
              {
                "type":"postback",
                "title":"Quiero el combo 1",
                "payload":"MARKETING_COMBO_1"
              },
              {
                "type":"postback",
                "title":"Más información",
                "payload":"info_package_1"
              }
            ]
          },
          {
            "title": "Combo de Marketing 2",
            "image_url": "https://user-images.githubusercontent.com/10179447/90703761-d9a33d80-e24b-11ea-9919-75bebb8e9346.png",
            "subtitle": "GTQ 1,150.00",
            "buttons": [
              {
                "type":"postback",
                "title":"Quiero el combo 2",
                "payload":"MARKETING_COMBO_2"
              },
              {
                "type":"postback",
                "title":"Más información",
                "payload":"info_package_2"
              }
            ]
          },
          {
            "title": "Combo de Marketing 3",
            "image_url": "https://user-images.githubusercontent.com/10179447/90703763-db6d0100-e24b-11ea-9636-52df78997054.png",
            "subtitle": "GTQ 1,560.00",
            "buttons": [
              {
                "type":"postback",
                "title":"Quiero el combo 3",
                "payload":"MARKETING_COMBO_3"
              },
              {
                "type":"postback",
                "title":"Más información",
                "payload":"info_package_3"
              }
            ]
          }
        ]
      }
    }
  }
}

const conversationExists = (pending_data) => {
  console.log('Pending: ' + pending_data);
  let responses = [{text: "Actualmente hay datos de una campaña previa creada. Si quieres hacer un cambio comunicate con un asesor."}]
  switch (pending_data) {
    case 'business_name':
      responses.push({text: "Si deseas seguir con con la campaña actual, ingresa el nombre de tu empresa"})
      break;
    case 'marketing_package':
      responses.push({text: "Si deseas seguir con con la campaña actual, ingresa el combo de marketing"})
      responses.push(marketingCombos())
      break;
    case 'website':
      responses.push({text: "Si deseas seguir con con la campaña actual, ingresa tu sitio web"})
      break;
    case 'location':
      responses.push({text: "Si deseas seguir con con la campaña actual, ingresa una de las posibles ubicaciones.",
        quick_replies: countryList()})
      break;
    case 'phone':
      responses.push({text: "Si deseas seguir con con la campaña actual, ingresa tu número de teléfono"})
      break;
    case 'search_terms':
      responses.push({text: "Si deseas seguir con con la campaña actual, ingresa los servicios o productos principales de tu empresa"})
      break;
    case 'description':
      responses.push({text: "Si deseas seguir con con la campaña actual, ingresa una pequeña descripción de tu negocio en menos de 30 caracteres."})
      break;
    case 'slogan':
      responses.push({text: "Si deseas seguir con con la campaña actual, ingresa el slogan de tu negocio"})
      break;
    case 'history':
      responses.push({text: "Si deseas seguir con con la campaña actual, ingresa la historia de tu negocio"})
      break;
  }
  return responses;
}

const validPayment = () => {
  return [{text: "¡Eso sería todo! Tu campaña publicitaria está en proceso de lanzamiento. Pronto comenzarás a recibir visitas a tu sitio web y llamadas a tu negocio."},
    {text: "Si tienes alguna duda o pregunta puedes comunicarte directamente con nuestro equipo a info@tecnometro.net o puedes escribirnos a (502) 3517-7047"}];
}

const invalidPayment = () => {
  return [{text: "Su número de transacción es incorrecto. Por favor, chequee que esté bien escrito"}]
}

exports.notRecognized = notRecognized;
exports.welcomeMessage = welcomeMessage;
exports.helpMessage = helpMessage;
exports.initCampaign = initCampaign;
exports.talkHuman = talkHuman;
exports.completePayment = completePayment;
exports.nextFieldRequired = nextFieldRequired;
exports.countryList = countryList;
exports.errorInField = errorInField;
exports.finishedCampaignQuestions = finishedCampaignQuestions;
exports.marketingCombos = marketingCombos;
exports.conversationExists = conversationExists;
exports.validPayment = validPayment;
exports.invalidPayment = invalidPayment;