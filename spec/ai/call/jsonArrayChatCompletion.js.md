# jsonArrayChatCompletion.js

This module exports a function that takes an array of chat messages in ChatML format and sends it to the AI model for completion.

## Usage

```javascript
const jsonArrayChatCompletion = require('./jsonArrayChatCompletion');

const chatArray = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Who won the world series in 2020?' },
];

jsonArrayChatCompletion(chatArray, options)
  .then((response) => {
    console.log(response.completion);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Function Signature

```javascript
function jsonArrayChatCompletion(chatArray: Array, options: Object): Promise
```

### Parameters

- `chatArray`: An array of chat messages in ChatML format.
- `options`: An object containing options for the AI model.

### Returns

- A Promise that resolves with the AI model's completion response.

## Dependencies

- `ai.js`: For making API calls to the AI models.

## Notes

- The `options` object can include properties like `model` and `max_tokens` to customize the AI model's behavior.
- The function uses the `ai.getChatCompletion()` method from `core/ai.js` to send the chatArray to the AI model.