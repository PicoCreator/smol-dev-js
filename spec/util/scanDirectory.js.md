# `util/scanDirectory.js`

This module exports a single function `scanDirectory` that scans a given directory and returns a list of file paths that match the provided pattern.

## Function: scanDirectory

### Description

Scans a directory and returns a list of file paths that match the provided pattern.

### Parameters

- `dirPath` (string): The path of the directory to scan.
- `pattern` (string, optional): The pattern to match the file paths against. Defaults to `**/*`.

### Returns

- (Promise<Array<string>>): A promise that resolves to an array of file paths that match the provided pattern.

### Example

```javascript
const scanDirectory = require('./util/scanDirectory');

(async () => {
  const fileList = await scanDirectory('./src', '**/*.js');
  console.log(fileList);
})();
```

### Notes

- This function uses the `glob` module under the hood to perform the file scanning and pattern matching.
- The pattern supports glob patterns.