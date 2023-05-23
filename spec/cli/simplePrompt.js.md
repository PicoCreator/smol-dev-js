# simplePrompt.js

This module exports a function that provides a simple prompt for the user to input their desired action.

## Dependencies

- `prompts`: A library for creating interactive command-line prompts
- `chalk`: A library for styling terminal strings

## Functions

### simplePrompt(promptMessage, options)

This function displays a simple prompt to the user and returns their input.

#### Parameters

- `promptMessage` (string): The message to display to the user as a prompt
- `options` (object): An optional object containing additional configuration for the prompt

#### Returns

- (Promise): A promise that resolves to the user's input

## Usage

```javascript
const simplePrompt = require('./simplePrompt');

(async () => {
  const userInput = await simplePrompt('Enter your name:');
  console.log(`Hello, ${userInput}!`);
})();
```

## Example

```javascript
const simplePrompt = require('./simplePrompt');

(async () => {
  const userInput = await simplePrompt('Enter your name:', {
    type: 'text',
    name: 'name',
    message: 'Please enter your name'
  });
  console.log(`Hello, ${userInput.name}!`);
})();
```

This example shows using the `options` parameter to specify additional configuration for the prompt.