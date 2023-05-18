# `getActionList.js` Specification

This file is responsible for generating a list of actions that the AI developer can perform for the user.

## Function: `getActionList()`

### Description

This function returns an array of action objects that the AI developer can perform for the user.

### Input

None

### Output

- `Array`: An array of action objects, where each object has the following properties:
  - `name`: A string representing the name of the action.
  - `value`: A string representing the value of the action, which will be used internally by the AI developer.

### Example

```javascript
const actionList = getActionList();

console.log(actionList);
/*
[
  { name: "Move files or folders", value: "move" },
  { name: "Delete files or folders", value: "delete" },
  { name: "Generate/Edit a code/spec file, with the given instructions", value: "generate_edit" },
  { name: "Update code/spec from spec/code", value: "update" }
]
*/
```

## Dependencies

None