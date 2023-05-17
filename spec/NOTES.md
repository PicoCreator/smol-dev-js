# Overall project notes

- Use scanDirectory.js for scanning files, it already implements glob under the hood
- The spec files should be written as markdown files
- avoid modifying the MainSywac.js, in most cases you just want to add commands to mainCLI.js
- use core/ai.js for all your api calls to the AI models, as the credentials are already loaded there
- When implementing a new CLI command, their files should be in cli/command/ folders

# core/ai.js example usage

```
let res = await ai.getChatCompletion(
	arrayInChatMLformat, 
	{ 
		model: "gpt-4",
		max_tokens: 1000
	}
);
let responseMsg = res.completion;
```
