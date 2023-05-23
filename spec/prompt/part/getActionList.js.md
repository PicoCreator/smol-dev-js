# `getActionList.js`

This module exports a function that returns an array of available actions for the user.

## Function signature

```javascript
function getActionList(): string[]
```

## Description

The function returns an array of strings, each representing an available action for the user.

## Example

```javascript
const actionList = getActionList();
console.log(actionList);
// Output: ['Move files or folders', 'Delete files or folders', 'Generate/Edit a code/spec file, with the given instructions', 'Update code/spec from spec/code', 'Generate a new file from prompt']
```  

## Dependencies

None.