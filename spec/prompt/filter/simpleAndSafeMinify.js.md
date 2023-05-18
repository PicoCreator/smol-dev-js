# simpleAndSafeMinify.js

This module exports a single function `simpleAndSafeMinify` that takes a string as input and returns a minified version of the input string.

## Usage

```javascript
const simpleAndSafeMinify = require('./simpleAndSafeMinify');

const inputString = "  This is a   sample string. ";
const minifiedString = simpleAndSafeMinify(inputString);
console.log(minifiedString); // Output: "This is a sample string."
```

## Function: simpleAndSafeMinify(inputString)

- **inputString**: `string` - The input string to be minified.

### Returns

- `string` - The minified version of the input string.

### Description

The `simpleAndSafeMinify` function takes an input string and removes any extra whitespace characters (spaces, tabs, and newlines) from the beginning and end of the string, as well as any extra spaces between words. The function does not modify any other characters in the input string.