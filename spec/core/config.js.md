# `core/config.js`

This module is responsible for loading and managing the configuration of the AI Developer CLI.

## Functions

### `loadConfig()`

- Description: Loads the configuration from the `.aidconfig` file in the project root.
- Returns: `{Object}` - The loaded configuration object.

### `saveConfig(config)`

- Parameters:
  - `config {Object}` - The configuration object to save.
- Description: Saves the configuration object to the `.aidconfig` file in the project root.

### `getConfigValue(key)`

- Parameters:
  - `key {String}` - The key of the configuration value to retrieve.
- Returns: `{any}` - The value of the configuration key, or `undefined` if the key does not exist.

### `setConfigValue(key, value)`

- Parameters:
  - `key {String}` - The key of the configuration value to set.
  - `value {any}` - The value to set for the configuration key.
- Description: Sets the value of the configuration key and saves the updated configuration.

### `removeConfigValue(key)`

- Parameters:
  - `key {String}` - The key of the configuration value to remove.
- Description: Removes the configuration key and saves the updated configuration.

## Usage

```javascript
const config = require('./core/config');

// Load the configuration
const loadedConfig = config.loadConfig();

// Get a configuration value
const value = config.getConfigValue('someKey');

// Set a configuration value
config.setConfigValue('someKey', 'newValue');

// Remove a configuration value
config.removeConfigValue('someKey');
```