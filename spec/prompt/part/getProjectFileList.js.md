# getProjectFileList.js

This module exports a function that retrieves the list of project files.

## Function: getProjectFileList()

### Description

This function scans the project directory and returns a list of all files in the project.

### Parameters

None.

### Returns

- `Array<String>`: An array of file paths relative to the project root.

### Usage

```javascript
const getProjectFileList = require('./getProjectFileList');
const fileList = getProjectFileList();
```

### Example

```javascript
const fileList = getProjectFileList();
console.log(fileList);
// Output: ['src/ai/call/jsonArrayChatCompletion.js', 'src/cli/MainSywac.js', ...]
```