# core/aiBridge.js

This file contains the AI bridge, loading the API credentials and exposing an API to the other parts of the system.

```js
const aiBridge = require('ai-bridge');
const config = require('./config');

let ai;

async function init() {
  ai = await aiBridge.init({
    apiKey: config.AI_API_KEY,
    apiSecret: config.AI_API_SECRET
  });
}

async function getChatCompletion(arrayInChatMLformat, options) {
  return await ai.getChatCompletion(arrayInChatMLformat, options); 
}

module.exports = {
  init,
  getChatCompletion
}
```