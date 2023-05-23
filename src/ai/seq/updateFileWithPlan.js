// Core deps
const fs = require("fs");
const path = require("path");
const ai = require("../../core/aiBridge");
const getSpecDirPath = require("../../core/getSpecDirPath");
const getSrcDirPath = require("../../core/getSrcDirPath");

// Prompt builder deps
const getPromptBlock = require("../../prompt/builder/getPromptBlock");
const getMainDevSystemPrompt = require("../../prompt/part/getMainDevSystemPrompt");
const readFileOrNull = require("../../util/readFileOrNull");
const getChatCompletion = require("../call/getChatCompletion");

/**
 * Generate opening suggestions, at the start of the process
 */
module.exports = async function updateFileWithPlan(fileType, filePath, plan, depStr, commonCtx) {
	// Get the spec dir
	const specDir = getSpecDirPath();

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

	// Add the commonCtx
	if( commonCtx && commonCtx.length > 0 ) {
		promptArr.push([
			"",
			commonCtx
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

	// Load spec if its the src file
	if( fileType === "src" && specDir != null ) {
		let specFilePath = filePath+".md";
		let specFile = await readFileOrNull( path.resolve(specDir, specFilePath) );
		if( specFile ) {
			promptArr.push([
				"",
				getPromptBlock(`The following is the spec file '${specFilePath}'`, specFile),
				"(if the spec file contridicts the plan / README.md / NOTES.md, those take precedence)"
			]);
		}
	}

	let currentFile = await readFileOrNull(actualFilePath);
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
			"You do not need to add table of contents, unless it already exists",
			"",
			"Remember that you must obey 3 things: ",
			`	- you are generating markdown for the file ${filePath}`,
			`	- do not stray from the plan, or the names of the files and the dependencies we have shown above`,
			`	- MOST IMPORTANT OF ALL: every line of markdown you generate must be valid markdown code. Do not include code fences in your response`,
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
			"",
			"Include high level comments for the code you are generating",
			"If the user is asking you to generate sample data, of a specified size or range, do so without skipping it with comments",
			"Use TAB based indentation for the updated code",
			"",
			"THIS IS NOT A TUTORIAL - Ensure to complete you code when requested",
			"And avoid skipping data you need setup with comments",
			"",
			"For example this is Bad example:",
			"```javascript",
			"const arrayFrom1to10 = [",
			"	1,",
			"	2,",
			"	// ... Add 3-8 here",
			"	9,",
			"	10,",
			"]",
			"```",
			"",
			"This is a Good example:",
			"const arrayFrom1to10 = [1,2,3,4,5,6,7,8,9,10]",
			"",
			"Remember that you must obey 3 things: ",
			`	- you are generating code for the file ${filePath}`,
			`	- do not stray from the plan, or the names of the files and the dependencies we have shown above`,
			`	- MOST IMPORTANT OF ALL: every line of code you generate must be valid code. Do not include code fences in your response. Do not add file headers in your response`,
			"",
			"This is a Bad response:",
			"# main.js",
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
	let res = await getChatCompletion(promptArr.flat().join("\n"), {
		model: "smart"
	});
	
	// Write the file
	// ---
	await fs.promises.mkdir(path.dirname(actualFilePath), { recursive: true });
	await fs.promises.writeFile(actualFilePath, res.completion.trim(), "utf8");
}