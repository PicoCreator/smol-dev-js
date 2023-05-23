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

This function takes an input string and removes any extra spaces, tabs, and newlines, while preserving the original structure of the string. It is designed to be safe for use with any text content, including code and markup languages.