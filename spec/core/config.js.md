# `core/config.js`

This module is responsible for loading and managing the configuration of the AI developer assistant.

## Functions

### `loadConfig()`

- Description: Loads the configuration from the `config.json` file.
- Returns: `{Object}` - The loaded configuration object.

### `getConfig()`

- Description: Returns the current configuration object.
- Returns: `{Object}` - The current configuration object.

### `setConfig(newConfig)`

- Description: Updates the current configuration object with the provided `newConfig`.
- Parameters:
  - `newConfig {Object}` - The new configuration object to update the current configuration with.
- Returns: `undefined`

### `saveConfig()`

- Description: Saves the current configuration object to the `config.json` file.
- Returns: `{Promise}` - A promise that resolves when the configuration is saved.

## Usage

```javascript
const config = require('./core/config');

// Load the configuration
config.loadConfig();  

// Get the current configuration object
const currentConfig = config.getConfig();  

// Update the configuration object
config.setConfig({ key: 'newValue' });  

// Save the configuration object to the file
config.saveConfig();
```