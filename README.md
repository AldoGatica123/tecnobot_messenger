# Description

Facebook Messenger application for saving conversation data in order to create marketing campaigns in Google AdWords.
It uses the Handover protocol to pass the conversation control to a human. Captures the users responses and saves them in 
a DynamoDB table, and checks the payment status for creating new marketing campaigns.  

<img src="https://user-images.githubusercontent.com/10179447/93028401-02132300-f5d1-11ea-8428-1e7a0a85959b.png?raw=true" width="250" height="350">


## Use Cases
- Conversation flow  
<img src="https://github.com/davidromero/tecnobot/blob/master/docs/Overview_diagram.png?raw=true" width="400" height="250">  

- Campaign creation flow  
<img src="https://github.com/davidromero/tecnobot/blob/master/docs/ConversationOnChatbot_diagram.png?raw=true" width="115" height="492">

- Payment flow  
<img src="https://github.com/davidromero/tecnobot/blob/master/docs/PaymentOnChatBot_diagram.png?raw=true" width="181" height="585">

## Architecture  
<img src="https://user-images.githubusercontent.com/10179447/93031028-df8b0500-f5e4-11ea-9f1b-327ea561c0af.png?raw=true" width="350" height="100">

## Quickstart
```
npm install
npm run
```

## Deployment
```
amplify push
```

#### Routes


| Path      | Method    | Component   | Description                                   |
|-----------|-----      |-------------|-----------------------------------------------|
| /         | GET       | Root        | Route to check if the service is online       |
| /webhook  | GET       | Webhook     | Verification used by Facebook for every webhook |
| /webhook  | POST      | Webhook     | Messenger entry point for the application     |

