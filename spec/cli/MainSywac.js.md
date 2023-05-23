# MainSywac

This module exports a function that configures the main Sywac instance for the CLI application.

## Usage

```javascript
const mainSywac = require('./MainSywac');
const sywac = mainSywac();
```

## Function: mainSywac()

This function initializes and configures the main Sywac instance for the CLI application. It sets up the available commands, options, and their respective descriptions.

### Returns

- `sywac`: The configured Sywac instance.

## Commands

The following commands are available in the CLI application:

- `run`: Execute the AI developer assistant.
- `setup`: Set up the AI developer assistant.
- `code2spec`: Generate a spec file from a source code file.
- `spec2code`: Generate a source code file from a spec file.

## Options

The following options are available in the CLI application:

- `-v, --version`: Display the version number of the CLI application.
- `-h, --help`: Display the help information for the CLI application.