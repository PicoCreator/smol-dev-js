# prepareCommonContext.js

This file prepares the common context for generating files from the prompt.

It does the following:

- Loads the config from core/config.js
- Gets the src and spec directory paths from core/getSrcDirPath.js and core/getSpecDirPath.js
- Scans the src and spec directories using util/scanDirectory.js
- Extracts the project settings from prompt/part/getProjectSettings.js
- Extracts the project file list from prompt/part/getProjectFileList.js
- Extracts the AI notes from prompt/part/getAiNotes.js
- Returns an object with all the above information to be used in other files

The returned object has the following structure:
```js
{
  config,
  srcDirPath,
  specDirPath,
  srcFiles,
  specFiles,
  projectSettings,
  projectFileList,
  aiNotes 
}
```

This file is called by ai/seq/generateFilesFromPrompt.js to prepare the common context before generating files.