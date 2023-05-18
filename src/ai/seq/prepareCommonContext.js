// Core deps
const fs = require("fs");
const path = require("path");
const ai = require("../../core/ai");
const getSrcDirPath = require("../../core/getSrcDirPath");

// Prompt builder deps
const getPromptBlock = require("../../prompt/builder/getPromptBlock");

/**
 * Given the current plan, prepare the file list
 */
module.exports = async function prepareCommonContext(srcPathArr) {
	// Get the src path
	const srcDir = getSrcDirPath();
	const srcFile = path.resolve(srcDir, srcPath);

	// Check if src file is in src dir
	if( !srcFile.startsWith(srcDir) ) {
		throw new Error("srcPath must be a file in the src directory");
	}

	// Get the code file
	let codeFile = "";
	try {
		codeFile = (await fs.promises.readFile(srcFile, "utf8")).trim();
	} catch(e) {
		// Ignore
	}

	// Return blank, for blank
	if( codeFile == "" ) {
		// Log the request
		return "";
	}

	// Get the json stringified filepaths
	let filepaths_string = JSON.stringify(srcPathArr);
	
	// Prompt array building
	let promptArr = [
		`the files we have decided to generate are: ${filepaths_string}`,
		"",
		"Now that we have a list of files, we need to understand what dependencies they share",
		"Please name and briefly describe what is shared between the files we are generating, including exported variables, data schemas, id names of every DOM elements that javascript functions will use, message names, and function names",
		"Exclusively focus on the names of the shared dependencies, and do not add any other explanation",
		"",
	]

	// Perform the AI request
	let aiRes = await ai.getCompletion(promptArr.join("\n").trim(), {
		model: "gpt-4"
	});
	// Get the ai response
	return getPromptBlock(
		"The following is the shared var/schema/id used for the plan",
		aiRes.completion
	);
}