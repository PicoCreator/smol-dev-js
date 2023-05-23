# extractJsonObject.js

This module exports a function `extractJsonObject` that takes a string as input and returns a JSON object if the input string is a valid JSON object. If the input string is not a valid JSON object, it returns `null`.

## Usage

```javascript
const extractJsonObject = require('./extractJsonObject');

const input = '{"key": "value"}';
const jsonObject = extractJsonObject(input);

if (jsonObject) {
  console.log('Valid JSON object:', jsonObject);
} else {
  console.log('Invalid JSON object');
}
```

## Function: extractJsonObject(input)

- **input**: `string` - The input string to be checked for a valid JSON object.

- **Returns**: `Object|null` - Returns a JSON object if the input string is a valid JSON object, otherwise returns `null`.

## Dependencies

None.

## Implementation

```js
function extractJsonObject(input) {
  try {
    return JSON.parse(input);
  } catch (err) {
    return null;
  }
}

module.exports = extractJsonObject;
```