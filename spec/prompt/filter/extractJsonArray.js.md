# Extract JSON Array

This module provides a function to extract a JSON array from a given string.

## Function: extractJsonArray

### Parameters

- `inputString` (string): The input string from which the JSON array needs to be extracted.

### Returns

- (Array | null): Returns the extracted JSON array if found, otherwise returns null.

### Usage

```javascript
const extractJsonArray = require('./prompt/filter/extractJsonArray');

const inputString = '[{"key": "value"}, {"key2": "value2"}]';
const jsonArray = extractJsonArray(inputString);

console.log(jsonArray); // Output: [{"key": "value"}, {"key2": "value2"}]
```

### Notes

- The function uses a regular expression to match and extract the JSON array from the input string.
- If multiple JSON arrays are present in the input string, only the first one will be extracted.