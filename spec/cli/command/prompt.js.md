# cli/command/prompt.js

This file implements the `prompt` command.

It will prompt the user for details to generate a new file.

It uses the `inquirer` library to prompt the user with questions.

The questions it asks are:

- File path (relative to src/ folder)
- File name 
- File content (using the `prompts` library)

It then generates the file using the details provided by the user.

The file content is generated using a template, with placeholders for:

- File path 
- File name
- Content (provided by user)

It uses `prepareCommonContext.js` to prepare the context, and `generateFilesFromPrompt.js` to generate the files.

The template used is:

```js
const { file_path, file_name } = require('./prepareCommonContext');

/**
 * {file_content} 
 */
function {file_name}() {
  
}

module.exports = {file_name};
```

It replaces:

- {file_path} with the file path provided 
- {file_name} with the file name provided
- {file_content} with the content provided by the user

And saves the file to `src/{file_path}/{file_name}.js`