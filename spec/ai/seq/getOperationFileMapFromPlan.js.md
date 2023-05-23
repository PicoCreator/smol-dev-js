# getOperationFileMapFromPlan.js

This module exports a function that takes a plan object and returns an operation file map.

## Function Signature

```javascript
function getOperationFileMapFromPlan(plan: object): object
```

## Parameters

- `plan`: An object representing the plan.

## Return Value

- An object representing the operation file map.

## Example Usage

```javascript
const plan = {
  // ... plan object ...
};

const operationFileMap = getOperationFileMapFromPlan(plan);
```

## Dependencies

- None

## Notes

- Use `fs.promises` to read spec files
- Generate `updateSpecSrcFilePair` in `ai/seq/` folder
- Modify code in `prompt/part` and `ai/seq` directories  
- Include files in `prompt/part` and `ai/seq` directories