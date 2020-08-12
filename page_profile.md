
# Get Started

```
"get_started":{
    "payload":"GET_STARTED"
  }
```

# Greeting 

```
"greeting": [
    {
      "locale":"default",
      "text":"Hola {{user_first_name}}! Soy tecnobot" 
    }
  ]
```

# Ice breakers

```
"ice_breakers":[
     {
        "question": "Quisiera iniciar una campaña de marketing",
        "payload": "INIT_CAMPAIGN",
     },
     {
        "question": "Quiero completar un pago",
        "payload": "COMPLETE_PAYMENT",
     }
```

# Persistent menu

```
"persistent_menu": [
        {
            "locale": "default",
            "composer_input_disabled": false,
            "call_to_actions": [
                {
                    "type": "postback",
                    "title": "Iniciar campaña de marketing",
                    "payload": "INIT_CAMPAIGN"
                },
                {
                    "type": "postback",
                    "title": "Completar pago",
                    "payload": "COMPLETE_PAYMENT"
                },
                {
                    "type": "web_url",
                    "title": "Ir a tecnómetro",
                    "url": "https://www.tecnometro.net/",
                    "webview_height_ratio": "full"
                }
            ]
        }
    ]
```
