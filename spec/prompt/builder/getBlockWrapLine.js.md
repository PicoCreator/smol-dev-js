# `getBlockWrapLine.js`

This module exports a function that generates a block wrap line for a given text block.

## Function Signature

```javascript
function getBlockWrapLine(textBlock: string, wrapChar: string, wrapWidth: number): string
```

## Parameters

- `textBlock` (string): The text block that needs to be wrapped.
- `wrapChar` (string): The character used for wrapping the text block.
- `wrapWidth` (number): The width of the wrap line.

## Returns

- (string): The generated block wrap line.

## Example Usage

```javascript
const textBlock = "This is a sample text block";
const wrapChar = "-";
const wrapWidth = 30;

const wrapLine = getBlockWrapLine(textBlock, wrapChar, wrapWidth);
console.log(wrapLine); // Output: "------------------------------"
```

## Dependencies

- None

## Notes

- The wrap line should be of the same width as the given `wrapWidth`.
- If the `wrapWidth` is less than or equal to 0, an empty string should be returned.
- Use the `wrapChar` to generate the wrap line by repeating it `wrapWidth` number of times.