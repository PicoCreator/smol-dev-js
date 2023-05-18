# `cli/simplePrompt.js` Specification

This file contains the implementation of a simple prompt utility that can be used to ask the user for input.

## Functions

### `simplePrompt(promptOptions)`

This function takes a `promptOptions` object and returns a Promise that resolves to the user's input.

#### Parameters

- `promptOptions`: An object containing the following properties:
  - `type`: The type of the prompt (e.g., 'text', 'number', 'confirm', etc.).
  - `name`: The name of the prompt, which will be used as the key in the returned object.
  - `message`: The message to display to the user when prompting for input.
  - `initial`: (Optional) The initial value for the prompt.
  - `validate`: (Optional) A function that takes the user's input and returns a boolean indicating whether the input is valid or not.

#### Returns

A Promise that resolves to an object containing the user's input, with the `name` property from the `promptOptions` object as the key.

## Example Usage

```javascript
const simplePrompt = require('./simplePrompt');

(async () => {
  const userInput = await simplePrompt({
    type: 'text',
    name: 'username',
    message: 'Enter your username:',
    initial: 'guest',
    validate: (input) => input.length > 0,
  });

  console.log(`Hello, ${userInput.username}!`);
})();
```

## Dependencies

- `prompts`: Used to create and manage the user prompts.