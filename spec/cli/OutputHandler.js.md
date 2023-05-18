# OutputHandler.js

This file is responsible for handling the output of the CLI commands.

## Table of Contents

- [Functions](#functions)
  - [handleOutput](#handleoutput)

## Functions

### handleOutput

This function takes the result of a CLI command and formats it for display to the user.

**Parameters:**

- `result` (Object): The result object returned by the CLI command.

**Usage:**

```javascript
const outputHandler = require('./OutputHandler.js');
const result = {
  success: true,
  message: 'Operation completed successfully.',
  data: {
    filesUpdated: 3,
    filesDeleted: 1,
  },
};

outputHandler.handleOutput(result);
```

**Output:**

```
Operation completed successfully.
Files updated: 3
Files deleted: 1
```