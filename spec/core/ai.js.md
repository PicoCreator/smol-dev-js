# core/ai.js

This module provides a wrapper around the AI models and handles API calls to the AI models.

## Functions

### getChatCompletion(arrayInChatMLformat, options)

This function takes an array in ChatML format and options as input and returns a chat completion response.

- `arrayInChatMLformat`: An array of objects in ChatML format.
- `options`: An object containing options for the API call, such as `model` and `max_tokens`.

**Example usage:**

```javascript
let res = await ai.getChatCompletion(
	arrayInChatMLformat, 
	{ 
		model: "gpt-4",
		max_tokens: 1000
	}
);
let responseMsg = res.completion;
```

## Dependencies

- `ai-bridge`: For making API calls to the AI models.
- `config-loader`: For loading the AI credentials.