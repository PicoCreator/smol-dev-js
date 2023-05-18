# `util/scanDirectory.js`

This module exports a single function `scanDirectory` that takes a directory path and a pattern as arguments and returns a Promise that resolves to an array of file paths that match the given pattern.

## Usage

```javascript
const scanDirectory = require('./util/scanDirectory');

(async () => {
  const files = await scanDirectory('./src', '**/*.js');
  console.log(files);
})();
```

## Function: `scanDirectory(directory, pattern)`

### Parameters

- `directory` (string): The path to the directory to scan.
- `pattern` (string): The glob pattern to match files against.

### Returns

- A Promise that resolves to an array of file paths that match the given pattern.

### Description

This function uses the `glob` module to scan the given directory and match files against the provided pattern. It returns a Promise that resolves to an array of file paths that match the pattern.