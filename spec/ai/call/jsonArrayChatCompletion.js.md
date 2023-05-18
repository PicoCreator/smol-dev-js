# jsonArrayChatCompletion.js

This module exports a single function `jsonArrayChatCompletion` that takes an array of chat messages in ChatML format and returns a chat completion response from the AI model.

## Usage

```javascript
const jsonArrayChatCompletion = require('./jsonArrayChatCompletion');

const chatArray = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Who won the world series in 2020?' },
];

jsonArrayChatCompletion(chatArray)
  .then((response) => {
    console.log(response.completion);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Function: jsonArrayChatCompletion(chatArray, options)

- `chatArray` (Array): An array of chat messages in ChatML format.
- `options` (Object, optional): An object containing options for the AI model.
  - `model` (String, optional): The AI model to use. Default is "gpt-4".
  - `max_tokens` (Number, optional): The maximum number of tokens to generate. Default is 1000.

Returns a Promise that resolves to an object containing the chat completion response from the AI model.

### Example

```javascript
const chatArray = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Who won the world series in 2020?' },
];

jsonArrayChatCompletion(chatArray, { model: 'gpt-4', max_tokens: 1000 })
  .then((response) => {
    console.log(response.completion);
  })
  .catch((error) => {
    console.error(error);
  });
```