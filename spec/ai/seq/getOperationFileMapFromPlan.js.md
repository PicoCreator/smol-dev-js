# getOperationFileMapFromPlan.js

This module exports a function that takes a plan object and returns an operation file map.

## Function Signature

```javascript
function getOperationFileMapFromPlan(plan: object): object
```

## Parameters

- `plan`: An object representing the plan for the operations to be performed.

## Return Value

- Returns an object representing the operation file map.

## Example Usage

```javascript
const plan = {
  // ... plan object ...
};

const operationFileMap = getOperationFileMapFromPlan(plan);
```

## Dependencies

- None