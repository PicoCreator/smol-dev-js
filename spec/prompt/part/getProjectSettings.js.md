# getProjectSettings.js

This module exports a function that returns an object containing the project settings.

## Function Signature

```javascript
function getProjectSettings(): object
```

## Description

The function reads the project settings from the `package.json` file and returns an object containing the following properties:

- `projectShortDescription`: A string representing the short description of the project.
- `targetNodeVersion`: A string representing the target Node.js version.
- `npmModulesInstalled`: An object containing the installed NPM modules and their versions.
- `specificationFileList`: An array of strings representing the list of specification files in the `specs` folder.
- `sourceCodeFileList`: An array of strings representing the list of source code files in the `src` folder.

## Example Usage

```javascript
const projectSettings = getProjectSettings();

console.log(projectSettings);
/*
{
  projectShortDescription: "CLI based AI developer, you can use today",
  targetNodeVersion: ">=18.0.0",
  npmModulesInstalled: {
    "@js-util/config-loader": "^1.2.7",
    "ai-bridge": "^1.1.1",
    "chalk": "^4.1.2",
    "glob": "^10.2.4",
    "inquirer": "^9.2.3",
    "prompts": "^2.4.2",
    "sywac": "^1.3.0"
  },
  specificationFileList: [...],
  sourceCodeFileList: [...]
}
*/
```

## Dependencies

- `fs.promises`: Used to read the `package.json` file.
- `scanDirectory.js`: Used to scan the `specs` and `src` folders for the list of files.