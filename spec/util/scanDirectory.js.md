# `scanDirectory.js` Specification

This module provides a utility function to scan a directory and return a list of files that match a given pattern.

## Function: `scanDirectory(directory, pattern)`

### Parameters

- `directory` (string): The directory to scan.
- `pattern` (string): The pattern to match files against.

### Returns

- A Promise that resolves to an array of file paths that match the given pattern.

### Usage

```javascript
const scanDirectory = require('./util/scanDirectory');

(async () => {
  const files = await scanDirectory('./src', '**/*.js');
  console.log(files);
})();
```

### Notes

- This function uses the `glob` module under the hood to perform the file scanning and pattern matching.
- The function should be used for scanning files in the project, as it is already implemented and optimized for this purpose.