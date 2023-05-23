# OutputHandler.js

This module exports a class `OutputHandler` that is responsible for handling the output of the CLI commands.

## Class: OutputHandler

### constructor(options)

- `options`: An object containing the following properties:
  - `verbose`: A boolean indicating whether to print verbose output or not. Default is `false`.

### Methods

#### log(message)

- `message`: A string representing the message to be logged.
- Logs the given message to the console.

#### error(message)

- `message`: A string representing the error message to be logged.
- Logs the given error message to the console with a red color.

#### success(message)

- `message`: A string representing the success message to be logged.
- Logs the given success message to the console with a green color.

#### info(message)

- `message`: A string representing the info message to be logged.
- Logs the given info message to the console with a blue color.

#### verbose(message)

- `message`: A string representing the verbose message to be logged.
- Logs the given verbose message to the console if the `verbose` option is set to `true`.

#### warn(message)

- `message`: A string representing the warning message to be logged.
- Logs the given warning message to the console with a yellow color.