# code2spec.js

This module provides the functionality to generate a spec file from a given source code file.

## Functions

### `code2spec(filePath: string, options: object)`

This function takes a file path and options as input and generates a spec file based on the source code file.

#### Parameters

- `filePath` (string): The path of the source code file.
- `options` (object): An object containing options for the code2spec process. The following options are supported:
  - `outputDir` (string): The directory where the generated spec file should be saved. Defaults to the current working directory.
  - `overwrite` (boolean): Whether to overwrite an existing spec file if it exists. Defaults to `false`.

#### Returns

- `Promise<void>`: A promise that resolves when the spec file has been generated.

## Usage

```javascript
const { code2spec } = require('./code2spec');

(async () => {
  await code2spec('./src/ai/call/jsonArrayChatCompletion.js', {
    outputDir: './specs/ai/call',
    overwrite: true,
  });
})();
```