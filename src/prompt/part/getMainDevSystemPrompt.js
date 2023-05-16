// Core deps
const ai = require("../../core/ai");

// Prompt builder deps
const getProjectDependencyList = require("./getProjectSettings");
const getProjectFileList = require("./getProjectFileList");
const getShortDescription = require("./getShortDescription");
const getAiNotes = require("./getAiNotes");
const getActionList = require("./getActionList");
const getPromptBlock = require("../builder/getPromptBlock");

/**
 * Generate opening suggestions, at the start of the process
 **/
module.exports = async function getMainDevSystemPrompt() {
	// Build the system prompt
	let sysPromptArr = [
		"You are an AI developer assitant who is trying to write a program that will generate code for the user based on their intent",
		"",
		"The following are some details of the project ...",
		"",
		await getShortDescription(),
		"",
		await getProjectDependencyList(),
		"",
		await getProjectFileList(),
		"",
		await getAiNotes(),
		"",
		await getActionList()
	];

    // Return the joined system prompt
    return sysPromptArr.join("\n").trim();
}