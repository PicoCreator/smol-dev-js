# `core/getSrcDirPath.js`

This module exports a function that returns the path to the `src` directory of the project.

## Function signature

```javascript
function getSrcDirPath(): string
```

## Usage

```javascript
const srcDirPath = getSrcDirPath();
```

## Description

The `getSrcDirPath` function returns the path to the `src` directory of the project. This is useful for accessing and manipulating source code files within the project.

## Example

```javascript
const path = require('path');
const getSrcDirPath = require('./core/getSrcDirPath');

const srcDirPath = getSrcDirPath();
console.log(srcDirPath); // Outputs: "/home/coder/project/ec-proj/my-ai-dev/src"
```