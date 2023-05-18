# MainSywac.js

MainSywac.js is the main entry point for the CLI application. It sets up the Sywac CLI framework and defines the available commands for the user.

## Dependencies

- `sywac`: The CLI framework used to define commands and parse command line arguments.
- `chalk`: A library for styling console output.
- `mainCLI.js`: The main CLI module that contains the commands to be registered with Sywac.

## Usage

1. Import the required dependencies:

```javascript
const sywac = require('sywac');
const chalk = require('chalk');
const mainCLI = require('./mainCLI.js');
```

2. Configure Sywac with the available commands:

```javascript
sywac
  .command(mainCLI)
  .help('-h, --help')
  .version('-v, --version', { version: require('../version.js') })
  .outputSettings({ maxWidth: 120 });
```

3. Parse the command line arguments and handle the output:

```javascript
sywac.parseAndExit().then((output) => {
  if (output.code === 0) {
    console.log(chalk.green(output.result));
  } else {
    console.error(chalk.red(output.result));
  }
});
```

## Commands

The available commands are defined in the `mainCLI.js` file and registered with Sywac using the `.command()` method. The commands include:

- `code2spec`: Generate a spec file from a given code file.
- `run`: Execute a specific action based on the user's intent.
- `setup`: Set up the project environment and configuration.

For more information on each command, refer to their respective documentation in the `cli/command/` folder.