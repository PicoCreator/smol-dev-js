# jsonObjectChatCompletion.js

This module exports a single function, `jsonObjectChatCompletion`, which takes a JSON object as input and returns a chat completion response from the AI model.

## Usage

```javascript
const jsonObjectChatCompletion = require('./jsonObjectChatCompletion');

const input = {
  "role": "system",
  "content": "You are a helpful assistant."
};

jsonObjectChatCompletion(input)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });
```

## Function Signature

```javascript
async function jsonObjectChatCompletion(input: object, options?: object): Promise<object>
```

### Parameters

- `input` (object): The JSON object to be used as input for the chat completion.
- `options` (optional, object): An optional object containing additional options for the AI model, such as `model` and `max_tokens`.

### Returns

- A Promise that resolves to an object containing the chat completion response from the AI model.

## Dependencies

- `ai-bridge`: Used to make API calls to the AI models.
- `core/ai.js`: Used for all API calls to the AI models, as the credentials are already loaded there.

## Related Files

- `ai/call/jsonArrayChatCompletion.js`: Similar module that takes a JSON array as input instead of a JSON object.