// Core deps
const ai = require("../../core/ai");

// Prompt builder deps
const getProjectDependencyList = require("../../prompt/part/getProjectSettings");
const getProjectFileList = require("../../prompt/part/getProjectFileList");
const getShortDescription = require("../../prompt/part/getShortDescription");
const getAiNotes = require("../../prompt/part/getAiNotes");

/**
 * Generate opening suggestions, at the start of the process
 */
module.exports = async function openingSuggestion() {
	// Build the prompt
	let promptArr = [
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
		await getActionList(),
		"",
	];
	
	// Suggest an incremental change which you can do to improve the project
	promptArr.push(
		"User:",
		"Suggest an incremental change which you can do to improve the project",
		"if you are not sure, ask instead for what should be done",
		"",
		"if there are missing spec files, or src code file pairs, you can suggest generating either of them",
		"",
		"Assistant:"
	);

	// Lets ask, we opt for the economical 3.5-turbo when possible
	let res = await ai.getChatCompletion(promptArr.join("\n"), {
		stream: true,
		model: "gpt-4e"
	});
	
	// Return the completion
	return res.completion;
}