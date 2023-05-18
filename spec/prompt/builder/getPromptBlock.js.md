# `getPromptBlock.js` Specification

## Overview

The `getPromptBlock.js` module is responsible for generating a prompt block based on the given input parameters. The prompt block is a string that represents a formatted block of text to be displayed to the user.

## Functions

### `getPromptBlock(promptTitle, promptBody, promptFooter)`

This function takes in three string parameters: `promptTitle`, `promptBody`, and `promptFooter`. It returns a formatted prompt block string.

#### Parameters

- `promptTitle` (string): The title of the prompt block.
- `promptBody` (string): The main content of the prompt block.
- `promptFooter` (string): The footer of the prompt block.

#### Return Value

- (string): A formatted prompt block string.

## Example Usage

```javascript
const getPromptBlock = require('./getPromptBlock.js');

const title = 'Welcome to the AI Developer Assistant';
const body = 'Please choose an action from the list below:';
const footer = 'Powered by AI';

const promptBlock = getPromptBlock(title, body, footer);
console.log(promptBlock);
```

## Output

```
========================================
Welcome to the AI Developer Assistant
========================================
Please choose an action from the list below:

----------------------------------------
Powered by AI
```