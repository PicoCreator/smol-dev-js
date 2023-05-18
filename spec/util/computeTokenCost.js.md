# `util/computeTokenCost.js`

This module exports a single function `computeTokenCost` that calculates the token cost of a given string.

## Function: `computeTokenCost(text)`

### Parameters

- `text` (string): The input text for which the token cost needs to be calculated.

### Returns

- (number): The token cost of the input text.

### Description

This function takes a string as input and calculates the token cost by counting the number of characters in the string. It returns the token cost as a number.

### Example

```javascript
const computeTokenCost = require('./util/computeTokenCost');

const text = "Hello, world!";
const cost = computeTokenCost(text);

console.log(cost); // 13
```

### Dependencies

- None