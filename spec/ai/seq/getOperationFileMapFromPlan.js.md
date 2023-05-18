# getOperationFileMapFromPlan.js

This module exports a single function `getOperationFileMapFromPlan` that takes a plan object and returns an operation file map.

## Function Signature

```javascript
function getOperationFileMapFromPlan(plan: object): object
```

## Parameters

- `plan`: An object representing the plan for updating the spec and source files.

## Return Value

- Returns an object representing the operation file map.

## Usage

```javascript
const operationFileMap = getOperationFileMapFromPlan(plan);
```

## Example

```javascript
const plan = {
  spec: {
    update: {
      "spec/ai/seq/getOperationFileMapFromPlan.js.md": {
        content: "Updated content",
      },
    },
  },
  src: {
    update: {
      "src/ai/seq/getOperationFileMapFromPlan.js": {
        content: "Updated content",
      },
    },
  },
};

const operationFileMap = getOperationFileMapFromPlan(plan);

console.log(operationFileMap);
/*
{
  "spec/ai/seq/getOperationFileMapFromPlan.js.md": {
    type: "update",
    content: "Updated content",
  },
  "src/ai/seq/getOperationFileMapFromPlan.js": {
    type: "update",
    content: "Updated content",
  },
}
*/
```