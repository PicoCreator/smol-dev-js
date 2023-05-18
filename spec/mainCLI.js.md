# mainCLI.js

This file is the entry point for the CLI application. It sets up the CLI commands and initializes the application.

## Table of Contents

- [Imports](#imports)
- [Main Function](#main-function)
- [Commands](#commands)
  - [Setup](#setup)
  - [Run](#run)
  - [Code2Spec](#code2spec)

## Imports

```javascript
const sywac = require('sywac');
const OutputHandler = require('./cli/OutputHandler');
const setupCommand = require('./cli/command/setup');
const runCommand = require('./cli/command/run');
const code2specCommand = require('./cli/command/code2spec');
```

## Main Function

The main function initializes the CLI application and sets up the commands.

```javascript
async function main() {
  // Initialize CLI application
  const cli = sywac
    .style(require('./cli/MainSywac'))
    .outputSettings({ OutputHandler });

  // Setup commands
  setupCommand(cli);
  runCommand(cli);
  code2specCommand(cli);

  // Parse and execute commands
  await cli.parseAndExit();
}

main();
```

## Commands

### Setup

The `setup` command initializes the project and creates necessary files and folders.

```javascript
setupCommand(cli);
```

### Run

The `run` command executes the AI developer assistant with the given input.

```javascript
runCommand(cli);
```

### Code2Spec

The `code2spec` command generates a spec file based on the given code file.

```javascript
code2specCommand(cli);
```