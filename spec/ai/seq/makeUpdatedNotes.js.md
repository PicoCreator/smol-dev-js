# makeUpdatedNotes.js

This module exports a single function `makeUpdatedNotes` that takes the current notes and a list of updates, and returns the updated notes.

## Function Signature

```javascript
function makeUpdatedNotes(currentNotes: string, updates: Array<string>): string
```

## Parameters

- `currentNotes` (string): The current notes in the NOTES.md file.
- `updates` (Array<string>): An array of update strings to be added to the notes.

## Return Value

- Returns a string containing the updated notes.

## Usage

1. Import the `makeUpdatedNotes` function from the module.

```javascript
const { makeUpdatedNotes } = require('./ai/seq/makeUpdatedNotes');
```

2. Call the `makeUpdatedNotes` function with the current notes and updates.

```javascript
const currentNotes = '...';
const updates = ['Update 1', 'Update 2'];
const updatedNotes = makeUpdatedNotes(currentNotes, updates);
```

3. Save the updated notes to the NOTES.md file.

## Example

```javascript
const { makeUpdatedNotes } = require('./ai/seq/makeUpdatedNotes');

const currentNotes = `
# Overall project notes

- Use scanDirectory.js for scanning files, it already implements glob under the hood
- The spec files should be written as markdown files
`;

const updates = [
  '- avoid modifying the MainSywac.js, in most cases you just want to add commands to mainCLI.js',
  '- use core/ai.js for all your api calls to the AI models, as the credentials are already loaded there',
];

const updatedNotes = makeUpdatedNotes(currentNotes, updates);
console.log(updatedNotes);
```

Output:

```
# Overall project notes

- Use scanDirectory.js for scanning files, it already implements glob under the hood
- The spec files should be written as markdown files
- avoid modifying the MainSywac.js, in most cases you just want to add commands to mainCLI.js
- use core/ai.js for all your api calls to the AI models, as the credentials are already loaded there
```