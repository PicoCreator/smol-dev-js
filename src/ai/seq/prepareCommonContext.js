// Core deps
const fs = require("fs");
const path = require("path");
const ai = require("../../core/aiBridge");
const getSrcDirPath = require("../../core/getSrcDirPath");

// Prompt builder deps
const getPromptBlock = require("../../prompt/builder/getPromptBlock");
const getMainDevSystemPrompt = require("../../prompt/part/getMainDevSystemPrompt");
const getChatCompletion = require("../call/getChatCompletion");

/**
 * Given the current plan, prepare the file list
 */
module.exports = async function prepareCommonContext(currentPlan, srcPathArr, localDepSummaryStrSet, promptHistory = []) {
	// Get the json stringified filepaths
	let filepaths_string = JSON.stringify(srcPathArr);
	
	// Prompt array building
	let promptArr = [
		await getMainDevSystemPrompt(null),
		"",
		getPromptBlock(
			"The following is the current plan you the AI developer has drafted, after several rounds of user feedback",
			currentPlan
		),
		"",
		getPromptBlock(
			"The following is the user prompt history for the current plan (in json array)",
			JSON.stringify(promptHistory)
		),
		"",
		`The files we have decided to generate are: ${filepaths_string}`,
		"",
		"The following is some details of local dependencies which you can use ...",
		localDepSummaryStrSet,
		"",
		"Now that we have a list of files, we need to understand what dependencies they share",
		"Please name and briefly describe what is shared between the files we are generating, including exported variables, data schemas, class names, or id names of every DOM elements that javascript functions will use, message names, and function names",
		"For ID names, make sure its clear its an ID using a # prefix (similar to css style selectors)",
		"Exclusively focus on the names of the shared dependencies, and do not add any other explanation",
		""
	]

	// Perform the AI request
	let aiRes = await getChatCompletion(promptArr.join("\n").trim(), {
		model: "smart"
	});
	// Get the ai response
	return [
		getPromptBlock(
			// The following is some details of common context which you should use ...
			"The following is the shared var/schema/id used for the plan that you should use  ...",
			aiRes.completion
		),
		"",
		// Append to common context the prompt history
		getPromptBlock(
			"The following is the user prompt history for the current plan (in json array)",
			JSON.stringify(promptHistory)
		)
	];
}