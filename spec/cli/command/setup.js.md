# Setup Command

The `setup` command is responsible for initializing the project and setting up the necessary configurations.

## Usage

```sh
my-ai-dev setup
```

## Implementation

The `setup` command is implemented in the `src/cli/command/setup.js` file.

### Dependencies

- `inquirer`: Used for prompting the user for input during the setup process.
- `fs.promises`: Used for reading and writing files during the setup process.
- `core/config.js`: Used for managing the project configuration.
- `util/scanDirectory.js`: Used for scanning the project directory for files.

### Functionality

1. Prompt the user for the following information:
   - Project name
   - Project description
   - Target Node version
   - NPM modules to be installed
2. Create a new directory for the project, if it does not already exist.
3. Write the user's input to a `config.json` file in the project directory.
4. Scan the project directory for existing files and folders.
5. If any existing files or folders are found, prompt the user to confirm if they want to overwrite them.
6. If the user confirms, delete the existing files and folders.
7. Generate the necessary project files and folders based on the user's input.
8. Install the specified NPM modules.
9. Display a success message to the user.

## Error Handling

- If there is an error during the setup process, display an error message to the user and exit the process.