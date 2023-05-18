# `util/computeTokenCost.js`

This module exports a single function, `computeTokenCost`, which calculates the token cost of a given string.

## Function: `computeTokenCost(text)`

### Parameters

- `text` (string): The input text for which the token cost needs to be calculated.

### Returns

- (number): The token cost of the input text.

### Description

The `computeTokenCost` function takes a string as input and calculates its token cost based on the number of characters in the string. It returns the calculated token cost as a number.

### Example

```javascript
const computeTokenCost = require('./util/computeTokenCost.js');

const text = "Hello, world!";
const cost = computeTokenCost(text);

console.log(cost); // Output: 13
```

### Related Files

- `ai/seq/getLocalDepSummary.js`: Uses `computeTokenCost` to calculate token costs for various text inputs.
- `ai/seq/planDraft.js`: Utilizes `computeTokenCost` to estimate token costs for different parts of the plan.