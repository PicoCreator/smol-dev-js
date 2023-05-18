# `getAiNotes.js` Specification

This file is responsible for retrieving AI notes from the `NOTES.md` file.

## Function: `getAiNotes`

### Parameters

- `notesFilePath`: The path to the `NOTES.md` file.

### Returns

- A string containing the AI notes extracted from the `NOTES.md` file.

### Description

1. Read the content of the `NOTES.md` file using the `readFileOrNull` utility function.
2. If the content is not null, extract the AI notes section between the `<<{{~~}}>>` lines.
3. Return the extracted AI notes as a string.

## Example Usage

```javascript
const aiNotes = getAiNotes('/path/to/NOTES.md');
console.log(aiNotes);
```

## Dependencies

- `readFileOrNull.js`: Utility function to read a file or return null if the file does not exist.