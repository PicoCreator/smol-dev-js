# `getProjectSettings.js`

This module exports a function that prompts the user to provide project settings.  

## Function Signature

```javascript
async function getProjectSettings(): Promise<object>
```  

## Description  

This function uses the `prompts` module to ask the user for the following project settings:  

1. Project short description  
2. Target Node version  
3. NPM modules installed  
4. Specification file list  
5. Source code file list  

The function returns an object containing the user's input for these settings.  

## Example Usage  

```javascript
const projectSettings = await getProjectSettings();  
console.log(projectSettings);  
```  

## Dependencies  

- `prompts` module (version ^2.4.2)