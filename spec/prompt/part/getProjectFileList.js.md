# `getProjectFileList.js`

This module exports a function that retrieves the list of project files.

## Function Signature

```javascript
async function getProjectFileList(): Promise<string[]>
```

## Description

The function scans the project directory and returns an array of file paths.

## Usage

```javascript
const getProjectFileList = require('./prompt/part/getProjectFileList.js');

(async () => {
  const fileList = await getProjectFileList();
  console.log(fileList);
})();
```

## Dependencies

- `scanDirectory.js`: Utility function to scan the project directory using glob patterns.

## Implementation

1. Import the `scanDirectory` utility function.
2. Call the `scanDirectory` function with the appropriate glob pattern to match all files in the project.
3. Return the resulting array of file paths.