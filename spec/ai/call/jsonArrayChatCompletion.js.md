# jsonArrayChatCompletion.js

This module exports a single function, `jsonArrayChatCompletion`, which takes an array of chat messages in ChatML format and returns a chat completion response from the AI model.

## Usage

```javascript
const jsonArrayChatCompletion = require('./jsonArrayChatCompletion');

const chatMessages = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'What is the weather like today?' },
];

const options = {
  model: 'gpt-4',
  max_tokens: 1000,
};

jsonArrayChatCompletion(chatMessages, options)
  .then((response) => {
    console.log(response.completion);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Function Signature

```javascript
function jsonArrayChatCompletion(chatMessages: Array, options: Object): Promise
```

### Parameters

- `chatMessages` (Array): An array of chat messages in ChatML format.
- `options` (Object): An object containing options for the AI model, such as `model` and `max_tokens`.

### Returns

- A Promise that resolves to an object containing the AI model's chat completion response.

## Dependencies

- `ai.js`: This module uses the `getChatCompletion` function from the `ai.js` module to make API calls to the AI models.