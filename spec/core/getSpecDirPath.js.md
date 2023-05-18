# `core/getSpecDirPath.js`

This module exports a function that returns the path to the `spec` directory.

## Function signature

```javascript
function getSpecDirPath(): string
```

## Description

The `getSpecDirPath` function returns the path to the `spec` directory, which contains the specification files for the project.

## Usage

```javascript
const getSpecDirPath = require('./core/getSpecDirPath.js');

const specDirPath = getSpecDirPath();
console.log(specDirPath); // Outputs the path to the 'spec' directory
```

## Dependencies

- None

## Related files

- `core/getSrcDirPath.js`: Returns the path to the `src` directory.