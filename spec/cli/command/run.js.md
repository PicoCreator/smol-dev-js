# Run Command

The `run` command is a CLI command that allows users to execute a specific action on their project.

## Usage

```
my-ai-dev run [options] <action>
```

## Options

- `-f, --file <file>`: Specify the file to perform the action on.
- `-d, --directory <directory>`: Specify the directory to perform the action on.
- `-h, --help`: Display help for the `run` command.

## Actions

The following actions are supported by the `run` command:

1. Move files or folders
2. Delete files or folders
3. Generate/Edit a code/spec file, with the given instructions
4. Update code/spec from spec/code

## Examples

### Move a file

```
my-ai-dev run move -f src/oldFile.js -d src/newFolder/
```

### Delete a folder

```
my-ai-dev run delete -d src/oldFolder/
```

### Generate a new code file

```
my-ai-dev run generate -f src/newFile.js -i "Create a new file with a simple function"
```

### Update a spec file from its corresponding code file

```
my-ai-dev run update-spec -f spec/cli/command/newCommand.js.md
```