# openingSuggestion.js

This module exports a single function `openingSuggestion` that takes a `specSrcFilePair` object and returns an opening suggestion for the user.

## Function Signature

```javascript
async function openingSuggestion(specSrcFilePair: SpecSrcFilePair): Promise<string>
```

## Parameters

- `specSrcFilePair`: An object containing the spec and source file paths.

## Return Value

- Returns a Promise that resolves to a string containing the opening suggestion for the user.

## Dependencies

- `ai.getChatCompletion`: A function from `core/ai.js` that takes an array in ChatML format and an options object, and returns a chat completion response.

## Example Usage

```javascript
const openingSuggestion = require('./ai/seq/openingSuggestion');

(async () => {
  const specSrcFilePair = {
    specFilePath: '/path/to/spec/file.md',
    srcFilePath: '/path/to/src/file.js',
  };

  const suggestion = await openingSuggestion(specSrcFilePair);
  console.log(suggestion);
})();
```

## Implementation Notes

- Use the `ai.getChatCompletion` function to generate the opening suggestion based on the provided `specSrcFilePair`.
- The `ai.getChatCompletion` function should be called with an array in ChatML format and an options object with the desired model and max tokens.
- The response from `ai.getChatCompletion` should be used as the opening suggestion.