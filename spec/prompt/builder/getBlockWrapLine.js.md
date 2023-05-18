# `getBlockWrapLine.js` Specification

## Description

This module exports a function that generates a block wrap line for a given prompt block.

## Function Signature

```javascript
function getBlockWrapLine(length: number, char: string): string
```

### Parameters

- `length` (number): The length of the block wrap line.
- `char` (string): The character used to create the block wrap line.

### Returns

- (string): The generated block wrap line.

## Example Usage

```javascript
const blockWrapLine = getBlockWrapLine(10, '-');
console.log(blockWrapLine); // Output: ----------
```

## Dependencies

None.