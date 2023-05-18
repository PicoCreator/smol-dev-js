# getLocalDepSummary.js

This module is responsible for generating a summary of local dependencies in the project.

## Function: getLocalDepSummary()

This function will return an object containing the summary of local dependencies in the project.

### Input

- None

### Output

- An object containing the summary of local dependencies in the project.

### Process

1. Use `scanDirectory.js` to scan the `src` folder for all files.
2. Filter the files to only include `.js` files.
3. For each file, read its content using `fs.promises.readFile`.
4. Extract the local dependencies from the file content.
5. Create an object containing the summary of local dependencies.
6. Return the object containing the summary of local dependencies.

### Example

```javascript
const getLocalDepSummary = require('./getLocalDepSummary.js');

(async () => {
  const localDepSummary = await getLocalDepSummary();
  console.log(localDepSummary);
})();
```

This will output an object containing the summary of local dependencies in the project.