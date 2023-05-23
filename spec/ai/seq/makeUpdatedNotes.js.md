# makeUpdatedNotes.js

This module exports a single function `makeUpdatedNotes` that takes the current notes and the new notes, and returns the updated notes.

## Function Signature

```javascript
async function makeUpdatedNotes(currentNotes: string, newNotes: string): Promise<string> 
```

## Parameters

- `currentNotes` (string): The current notes in the project.
- `newNotes` (string): The new notes to be added to the project.

## Returns

- (Promise<string>): The updated notes, which is a combination of the current notes and the new notes.

## Example Usage

```javascript
const currentNotes = "Current project notes";
const newNotes = "New notes to be added";
const updatedNotes = await makeUpdatedNotes(currentNotes, newNotes);
console.log(updatedNotes); // "Current project notes\nNew notes to be added"
```

## Dependencies

- None