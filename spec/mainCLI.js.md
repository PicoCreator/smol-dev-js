# mainCLI.js

This file is the main entry point for the CLI application. It sets up the CLI commands and options using the Sywac library and handles the execution of the commands.

## Dependencies

- `sywac`: A library for building command line interfaces
- `chalk`: A library for styling console output
- `ai-bridge`: A library for interacting with AI models
- `core/ai.js`: A module for making API calls to AI models
- `cli/MainSywac.js`: A module for configuring the Sywac CLI
- `cli/command/setup.js`: A module for the `setup` command
- `cli/command/run.js`: A module for the `run` command
- `cli/command/code2spec.js`: A module for the `code2spec` command
- `prompt/part/getProjectSettings.js`: A module for getting project settings from the user

## Commands

### setup

The `setup` command initializes the project by creating necessary directories and files.

### run

The `run` command executes the specified action on the project.

### code2spec

The `code2spec` command generates a spec file from a given source code file.

### prompt

The `prompt` command prompts the user for project settings and generates files based on the responses.

## Usage

1. Import the necessary dependencies.  
2. Configure the Sywac CLI using the `MainSywac.js` module.  
3. Add the `setup`, `run`, `code2spec`, and `prompt` commands to the CLI.  
4. Parse the command line arguments and execute the appropriate command.

## Example

```javascript
const sywac = require('sywac');  
const chalk = require('chalk');  
const aiBridge = require('ai-bridge');  
const ai = require('./core/ai');  
const MainSywac = require('./cli/MainSywac');  
const setupCommand = require('./cli/command/setup');  
const runCommand = require('./cli/command/run');  
const code2specCommand = require('./cli/command/code2spec');
const promptCommand = require('./cli/command/prompt');

MainSywac(sywac);  

sywac.command(setupCommand);  
sywac.command(runCommand);  
sywac.command(code2specCommand);
sywac.command(promptCommand);

sywac.parseAndExit();
```