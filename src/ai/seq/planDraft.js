// Core deps
const ai = require("../../core/ai");

// Prompt builder deps
const getProjectDependencyList = require("../../prompt/part/getProjectSettings");
const getProjectFileList = require("../../prompt/part/getProjectFileList");
const getShortDescription = require("../../prompt/part/getShortDescription");
const getAiNotes = require("../../prompt/part/getAiNotes");
const getPromptBlock = require("../../prompt/builder/getPromptBlock");
const getActionList = require("../../prompt/part/getActionList");

/**
 * Generate opening suggestions, at the start of the process
 */
module.exports = async function planDraft(oriPlan, usrReply = "", streamHandler=null) {
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
		await getActionList(),
		"",
	];

	// Add the original plan
	if( oriPlan ) {
		sysPromptArr.push(
			getPromptBlock(
				"The following is the current plan draft",
				oriPlan
			)
		);
	}
	
	// Suggest an incremental change which you can do to improve the project
	sysPromptArr.push([
		"Reply to the user, what you plan to do next for the user, using the avaliable actions listed",
		"If there is something you want the user to do, which you can do so, let them know as well",
		"If you plan to add or modify a file, indicate which files you plan to modify, and how you plan to modify them",
		"(you do not need to elaborate to the user the list of actions you can do)",
		"",
		"Describe you plan in a concise manner"
	]);
	
	// ChatML format
	let chatArr = [
		{ "role": "system", "content": sysPromptArr.flat().join("\n") },
		{ "role": "user", "content": usrReply }
	]

	// Lets ask, we opt for the economical 3.5-turbo when possible
	let res = await ai.getChatCompletion(chatArr, {
		stream: true,
		model: "gpt-4e"
	}, streamHandler);
	
	// Return the completion
	return res.completion;
}