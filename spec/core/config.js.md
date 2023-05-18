# `core/config.js` Specification

This file is responsible for loading and managing the configuration settings for the AI developer CLI.

## Exports

- `loadConfig()`: A function that loads the configuration settings from the user's project.
- `saveConfig(config)`: A function that saves the updated configuration settings to the user's project.

## Functions

### `loadConfig()`

This function reads the configuration file from the user's project and returns the configuration settings as an object.

#### Returns

- `config`: An object containing the configuration settings for the AI developer CLI.

### `saveConfig(config)`

This function saves the updated configuration settings to the user's project.

#### Parameters

- `config`: An object containing the updated configuration settings for the AI developer CLI.

#### Returns

- `Promise`: A promise that resolves when the configuration settings have been saved successfully.

## Dependencies

- `@js-util/config-loader`: A utility module for loading and saving configuration files.