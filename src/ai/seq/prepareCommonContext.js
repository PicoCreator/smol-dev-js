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
	let aiRes = await ai.getChatCompletion(promptArr.join("\n").trim(), {
		model: "gpt-4"
	});
	// Get the ai response
	return getPromptBlock(
		// The following is some details of common context which you should use ...
		"The following is the shared var/schema/id used for the plan that you should use  ...",
		aiRes.completion
	);
}