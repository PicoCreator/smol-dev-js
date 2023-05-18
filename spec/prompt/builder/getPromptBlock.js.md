# `getPromptBlock.js`

This module exports a single function `getPromptBlock` that takes an object with the following properties:

- `projectSettings`: An object containing the project settings
- `shortDescription`: A string containing the short description of the project
- `actionList`: An array of strings representing the list of actions the AI developer can perform
- `projectFileList`: An array of strings representing the list of project files
- `aiNotes`: A string containing the AI notes for the overall project

The function returns a string containing the generated prompt block in markdown format.

## Usage

```javascript
const getPromptBlock = require('./getPromptBlock');

const promptBlock = getPromptBlock({
  projectSettings: { ... },
  shortDescription: 'CLI based AI developer, you can use today',
  actionList: [ ... ],
  projectFileList: [ ... ],
  aiNotes: '...'
});

console.log(promptBlock);
```

## Dependencies

- `getBlockWrapLine`: A function that takes a string and returns a wrapped line with the given string
- `getProjectSettings`: A function that takes an object containing the project settings and returns a markdown formatted string
- `getShortDescription`: A function that takes a string containing the short description and returns a markdown formatted string
- `getActionList`: A function that takes an array of strings representing the list of actions and returns a markdown formatted string
- `getProjectFileList`: A function that takes an array of strings representing the list of project files and returns a markdown formatted string
- `getAiNotes`: A function that takes a string containing the AI notes and returns a markdown formatted string

## Function Signature

```javascript
/**
 * @param {Object} options - The options object
 * @param {Object} options.projectSettings - The project settings object
 * @param {string} options.shortDescription - The short description of the project
 * @param {string[]} options.actionList - The list of actions the AI developer can perform
 * @param {string[]} options.projectFileList - The list of project files
 * @param {string} options.aiNotes - The AI notes for the overall project
 * @returns {string} - The generated prompt block in markdown format
 */
function getPromptBlock(options) { ... }
```