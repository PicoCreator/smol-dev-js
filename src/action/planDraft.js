// Core deps
const ai = require("../core/ai");

// Prompt builder deps
const getProjectDependencyList = require("../prompt/part/getProjectSettings");
const getProjectFileList = require("../prompt/part/getProjectFileList");
const getShortDescription = require("../prompt/part/getShortDescription");
const getAiNotes = require("../prompt/part/getAiNotes");
const getPromptBlock = require("../prompt/builder/getPromptBlock");
const getActionList = require("../prompt/part/getActionList");

/**
 * Generate opening suggestions, at the start of the process
 */
module.exports = async function planDraft(oriPlan, usrReply = "", streamHandler=null) {
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

	// Add the original plan
	if( oriPlan ) {
		promptArr.push(
			getPromptBlock(
				"The following is the current plan draft",
				oriPlan
			)
		);
	}
	
	// Suggest an incremental change which you can do to improve the project
	promptArr.push(
		"Reply to the user, what you plan to do next",
		"",
		getPromptBlock("User", usrReply),
		"",
		"Assistant:"
	);

	// Lets ask, we opt for the economical 3.5-turbo when possible
	let res = await ai.getChatCompletion(promptArr.join("\n"), {
		stream: true,
		model: "gpt-4e"
	}, streamHandler);
	
	// Return the completion
	return res.completion;
}