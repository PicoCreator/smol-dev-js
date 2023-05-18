# `getMainDevSystemPrompt.js`

This module exports a function that generates the main developer system prompt for the CLI.

## Function Signature

```javascript
function getMainDevSystemPrompt(): string
```

## Description

The `getMainDevSystemPrompt` function returns a string containing the main developer system prompt. This prompt is used as the main message when interacting with the CLI.

## Dependencies

- `chalk`: Used for styling the prompt text.

## Example Usage

```javascript
const mainPrompt = getMainDevSystemPrompt();
console.log(mainPrompt);
```

## Output

The output will be a styled string containing the main developer system prompt.