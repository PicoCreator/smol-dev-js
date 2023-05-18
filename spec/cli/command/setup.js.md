# Setup Command Specification

## Description

The `setup` command initializes the project with the necessary configuration and folder structure.

## Usage

```
my-ai-dev setup [options]
```

## Options

- `-f, --force`: Force the setup process, overwriting any existing configuration files.

## Behavior

1. Check if the project already has a configuration file (`.my-ai-dev-config.json`). If it exists and the `--force` option is not provided, display an error message and exit the process.
2. Prompt the user for the following project settings:
   - Project short description
   - Target Node version
   - NPM modules to be installed
3. Create the `.my-ai-dev-config.json` file with the provided settings.
4. Create the `specs` and `src` folders if they do not exist.
5. Display a success message indicating that the setup process is complete.

## Example

```
> my-ai-dev setup

Project short description: CLI based AI developer, you can use today
Target Node version: >=18.0.0
NPM modules to be installed: @js-util/config-loader, ai-bridge, chalk, glob, inquirer, prompts, sywac

Configuration file created: .my-ai-dev-config.json
Folders created: specs, src

Setup complete!
```