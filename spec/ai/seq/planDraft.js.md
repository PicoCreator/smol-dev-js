# planDraft.js

This module is responsible for creating a draft plan for updating the code and spec files based on the user's intent.

## Functions

### `async function createDraftPlan(intent, specFile, codeFile)`

This function takes the user's intent, spec file, and code file as input and generates a draft plan for updating the files.

#### Parameters

- `intent` (String): The user's intent for updating the files.
- `specFile` (String): The path to the spec file.
- `codeFile` (String): The path to the code file.

#### Returns

- `Promise<Object>`: A promise that resolves to an object containing the draft plan for updating the files.

## Usage

```javascript
const planDraft = require('./ai/seq/planDraft');

(async () => {
  const intent = 'Add a new function to the code file';
  const specFile = '/path/to/spec/file.md';
  const codeFile = '/path/to/code/file.js';

  const draftPlan = await planDraft.createDraftPlan(intent, specFile, codeFile);
  console.log(draftPlan);
})();
```

## Example Output

```json
{
  "intent": "Add a new function to the code file",
  "specFile": "/path/to/spec/file.md",
  "codeFile": "/path/to/code/file.js",
  "actions": [
    {
      "type": "add",
      "target": "code",
      "content": "function newFunction() {\n  // Your code here\n}"
    },
    {
      "type": "add",
      "target": "spec",
      "content": "## New Function\n\n### `function newFunction()`\n\nThis function does something amazing."
    }
  ]
}
```