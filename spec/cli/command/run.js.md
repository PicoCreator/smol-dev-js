# `run.js` Specification

## Overview

`run.js` is a CLI command that allows the user to execute a specific action on their project. The command is located in the `cli/command/` folder.

## Dependencies

- `ai-bridge`: For interacting with the AI models
- `chalk`: For styling console output
- `inquirer`: For creating interactive prompts
- `prompts`: For creating simple prompts
- `core/ai.js`: For making API calls to the AI models
- `core/config.js`: For accessing project configuration
- `cli/simplePrompt.js`: For creating simple prompts
- `util/scanDirectory.js`: For scanning files in the project

## Functionality

1. Parse the command line arguments to determine the action to be performed.
2. Display a list of available actions to the user if no action is specified.
3. Use `core/ai.js` to make API calls to the AI models for generating code based on the user's intent.
4. Use `inquirer` and `prompts` to create interactive prompts for gathering additional information from the user.
5. Perform the specified action on the project, such as moving, deleting, or updating files.
6. Display the result of the action to the user using `chalk` for styling.

## Example Usage

```sh
$ my-ai-dev run move-files
```

This command will prompt the user for the source and destination paths and move the specified files accordingly.