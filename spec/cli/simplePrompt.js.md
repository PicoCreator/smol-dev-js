# simplePrompt.js

This module exports a function that provides a simple prompt for the user to input their intent.

## Usage

```javascript
const simplePrompt = require('./simplePrompt');

simplePrompt(promptMessage).then((response) => {
  console.log(response);
});
```

## Function: simplePrompt(promptMessage)

- **Parameters:**
  - `promptMessage` (String): The message to display as a prompt to the user.
- **Returns:** A Promise that resolves with the user's input.

## Dependencies

- `prompts` (NPM module)

## Implementation

1. Import the `prompts` module.
2. Define the `simplePrompt` function with the `promptMessage` parameter.
3. Use the `prompts` module to create a text input prompt with the given `promptMessage`.
4. Return the user's input as a Promise.