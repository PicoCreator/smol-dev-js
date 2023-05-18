# readFileOrNull.js

This module exports a single function `readFileOrNull` that reads a file and returns its content as a string. If the file does not exist or an error occurs while reading the file, it returns `null`.

## Usage

```javascript
const readFileOrNull = require('./util/readFileOrNull');

(async () => {
  const content = await readFileOrNull('path/to/file.txt');
  if (content === null) {
    console.log('File not found or error reading file');
  } else {
    console.log('File content:', content);
  }
})();
```

## Function Signature

```javascript
/**
 * Reads a file and returns its content as a string.
 * If the file does not exist or an error occurs while reading the file, it returns null.
 *
 * @param {string} filePath - The path to the file to read.
 * @returns {Promise<string|null>} - A promise that resolves to the file content as a string or null if the file does not exist or an error occurs while reading the file.
 */
async function readFileOrNull(filePath: string): Promise<string | null>
```

## Dependencies

- `fs.promises`: The built-in Node.js module for working with the file system using promises.