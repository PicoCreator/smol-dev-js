# Core AI Module

This module provides an interface to interact with AI models using the `ai-bridge` package.

## Functions

### getChatCompletion

This function sends a chat message to the AI model and receives a completion response.

```javascript
async function getChatCompletion(arrayInChatMLformat, options)
```

**Parameters:**

- `arrayInChatMLformat`: An array of chat messages in ChatML format.
- `options`: An object containing options for the AI model, such as `model` and `max_tokens`.

**Returns:**

- A Promise that resolves to an object containing the AI model's completion response.

**Example Usage:**

```javascript
let res = await getChatCompletion(
  arrayInChatMLformat,
  {
    model: "gpt-4",
    max_tokens: 1000
  }
);
let responseMsg = res.completion;
```

## Dependencies

- `ai-bridge` package for interacting with AI models.
- `config-loader` package for loading AI model credentials.