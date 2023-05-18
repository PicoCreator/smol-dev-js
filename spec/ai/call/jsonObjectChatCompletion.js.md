# jsonObjectChatCompletion.js.md

## Description

This module exports a function that takes a JSON object as input and returns a chat completion response from the AI model.

## Dependencies

- `ai-bridge`: For making API calls to the AI models
- `core/ai.js`: For using the `getChatCompletion` function

## Function: jsonObjectChatCompletion

### Parameters

- `jsonObject`: A JSON object containing the chat conversation
- `options`: An optional object containing additional options for the API call

### Returns

- A Promise that resolves to the chat completion response from the AI model

### Usage

```javascript
const jsonObjectChatCompletion = require('./jsonObjectChatCompletion');

const jsonObject = {
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user",
      "content": "What's the weather like today?"
    }
  ]
};

jsonObjectChatCompletion(jsonObject)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
```

### Implementation

1. Import the `getChatCompletion` function from `core/ai.js`
2. Convert the JSON object to a chat conversation in the required format
3. Call the `getChatCompletion` function with the chat conversation and options
4. Return the chat completion response from the AI model