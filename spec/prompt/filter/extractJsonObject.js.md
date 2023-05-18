# Extract JSON Object

This module provides a function to extract a JSON object from a given string.

## Function Signature

```javascript
function extractJsonObject(input: string): object | null
```

## Description

The `extractJsonObject` function takes an input string and attempts to extract a JSON object from it. If successful, it returns the JSON object; otherwise, it returns `null`.

## Parameters

- `input` (string): The input string from which to extract the JSON object.

## Returns

- (object | null): The extracted JSON object if successful, or `null` if no valid JSON object is found.

## Usage

```javascript
const extractJsonObject = require('./prompt/filter/extractJsonObject');

const input = '{"key": "value"}';
const jsonObject = extractJsonObject(input);

console.log(jsonObject); // { key: 'value' }
```

## Dependencies

- None