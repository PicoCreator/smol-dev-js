// Core deps
const fs = require("fs");
const path = require("path");
const ai = require("../../core/ai");
const getSpecDirPath = require("../../core/getSpecDirPath");
const getSrcDirPath = require("../../core/getSrcDirPath");

// Prompt builder deps
const getPromptBlock = require("../../prompt/builder/getPromptBlock");
const getMainDevSystemPrompt = require("../../prompt/part/getMainDevSystemPrompt");

/**
 * Generate opening suggestions, at the start of the process
 */
module.exports = async function updateFileWithPlan(fileType, filePath, plan, depStr) {
	// Build the system prompt
	// ---
	let promptArr = [
		await getMainDevSystemPrompt(null),
		"",
		`You will be making some changes to an existing ${fileType} file '${filePath}'`,
		"",
		getPromptBlock("The following is the current plan for the changes to be made", plan || ""),
	];

	// Add depStr if its provided
	if( depStr && depStr.length > 0 ) {
		promptArr.push([
			"",
			"The following is some details of local dependencies which you can use ...",
			depStr,
		]);
	}

	// Lets get the current file
	// ---

	let actualFilePath = filePath;
	if( fileType === "spec" ) {
		actualFilePath = path.resolve( getSpecDirPath(), filePath );
	} else if( fileType === "src" ) {
		actualFilePath = path.resolve( getSrcDirPath(), filePath );
	}

	let currentFile = null;
	try {
		currentFile = await fs.promises.readFile(actualFilePath, "utf8");
	} catch(e) {
		// Ignore
	}
	if( currentFile ) {
		promptArr.push([
			"",
			getPromptBlock(`The following is the ${fileType} file for '${filePath}'`, currentFile)
		]);
	}

	// The actual write prompt
	// ---
	if( fileType === "spec" ) {
		promptArr.push([
			"",
			"Now that you have gotten all the details above",
			"",
			"Only write in markdown the updated specification file",
			"do not add any other explanation, only return valid markdown for that file type",
			"",
			"We have already broken up the program into per-file generation",
			`Now your job is to generate only the markdown for the file '${filePath}'`,
			"Make sure to have consistent filenames if you reference other files we are also generating",
			"",
			"Remember that you must obey 3 things: ",
			`	- you are generating markdown for the file ${filePath}`,
			`	- do not stray from the plan, or the names of the files and the dependencies we have shown above`,
			`	- MOST IMPORTANT OF ALL: every line of markdown you generate must be markdown code. Do not include code fences in your response`,
			"",
			"This is a Bad response:",
			"```markdown",
			'# Hello There',
			"```",
			"",
			"This is a Good response:",
			'# Hello There',
			"",
			"Begin generating the updated markdown now."
		]);
	} else if( fileType === "src" ) {
		promptArr.push([
			"",
			"Now that you have gotten all the details above",
			"",
			"Only write valid code for the given filepath and file type, and return only the code",
			"do not add any other explanation, only return valid code for that file type",
			"",
			"We have already broken up the program into per-file generation",
			`Now your job is to generate only the code for the file '${filePath}'`,
			"Make sure to have consistent filenames if you reference other files we are also generating",
			"Use TAB based indentation for the updated code",
			"",
			"Remember that you must obey 3 things: ",
			`	- you are generating code for the file ${filePath}`,
			`	- do not stray from the plan, or the names of the files and the dependencies we have shown above`,
			`	- MOST IMPORTANT OF ALL: every line of code you generate must be valid code. Do not include code fences in your response`,
			"",
			"This is a Bad response:",
			"```javascript",
			'console.log("hello world")',
			"```",
			"",
			"This is a Good response:",
			'console.log("hello world")',
			"",
			"Begin generating the code now."
		]);
	}

	// Run it
	// ---
	let res = await ai.getChatCompletion(promptArr.flat().join("\n"), {
		stream: true,
		model: "gpt-4"
	});
	
	// Return the completion
	// ---
	return res.completion;
}