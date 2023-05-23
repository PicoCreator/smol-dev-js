# `getAiNotes.js`

This module exports a function that retrieves AI notes from the `NOTES.md` file.

## Function Signature

```javascript
async function getAiNotes(): Promise<string> 
```

## Description

- The function reads the content of the `NOTES.md` file located in the `specs` folder.
- It extracts the AI notes section, which is enclosed between two `<<{{~~}}>>` lines.
- The extracted AI notes are returned as a string.

## Dependencies

- `fs.promises`: Used to read the content of the `NOTES.md` file.
- `path`: Used to resolve the path to the `NOTES.md` file.

## Example Usage

```javascript
const aiNotes = await getAiNotes();
console.log(aiNotes);
```

## Error Handling

- If the `NOTES.md` file is not found or cannot be read, the function returns an empty string.
- If the AI notes section is not found in the `NOTES.md` file, the function returns an empty string.