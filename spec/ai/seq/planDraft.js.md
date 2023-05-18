# planDraft.js

This module is responsible for generating a draft plan for updating the code/spec files based on the user's intent.

## Functions

### `async function planDraft(intent, specFile, srcFile)`

Generates a draft plan for updating the code/spec files based on the user's intent.

#### Parameters

- `intent` (string): The user's intent for the update.
- `specFile` (string): The path to the spec file to be updated.
- `srcFile` (string): The path to the source code file to be used as a reference.

#### Returns

- `Promise<Object>`: A promise that resolves to an object containing the draft plan.

## Example Usage

```javascript
const planDraft = require('./planDraft');

(async () => {
  const intent = 'Add a new function to handle user input';
  const specFile = 'path/to/spec/file.md';
  const srcFile = 'path/to/source/code/file.js';

  const draftPlan = await planDraft(intent, specFile, srcFile);
  console.log(draftPlan);
})();
```

## Dependencies

- `ai.js`: For making API calls to the AI models.
- `readFileOrNull.js`: For reading the content of the spec and source code files.
- `computeTokenCost.js`: For computing the token cost of the user's intent.