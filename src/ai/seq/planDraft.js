// Core deps
const ai = require("../../core/ai");

// Prompt builder deps
const getPromptBlock = require("../../prompt/builder/getPromptBlock");
const getMainDevSystemPrompt = require("../../prompt/part/getMainDevSystemPrompt");

/**
 * Generate opening suggestions, at the start of the process
 */
module.exports = async function planDraft(oriPlan = "", usrReply = "", streamHandler=null) {
	// Build the system prompt
	let sysPromptArr = [
		await getMainDevSystemPrompt(null)
	];

	// Add the original plan
	sysPromptArr.push(
		getPromptBlock(
			"The following is the current plan draft",
			oriPlan || ""
		)
	);
	
	// Suggest an incremental change which you can do to improve the project
	sysPromptArr.push([
		"Reply to the user, what you plan to do next for the user, using the avaliable actions listed",
		"If there is something you want the user to do, which you can do so, let them know as well",
		"If you plan to add or modify a file, indicate which files you plan to modify, and how short summary you plan to do (just a rough description would do, avoid code examples)",
		"",
		"Describe you plan in a short concise manner",
		"Unless requested to, you do not need to provide rough outline of the code you plan to generate",
	]);
	
	// ChatML format
	let chatArr = [
		{ "role": "system", "content": sysPromptArr.flat().join("\n") },
		{ "role": "user", "content": usrReply },
		{ 
			"role": "system", 
			"content": [
				"Update the plan draft using the user feedback",
				"Keep the rest unchanged, unless the user specified otherwise",
				"Reply with the full updated plan draft"
			].join("\n") 
		},
	]

	// Lets ask, we opt for the economical 3.5-turbo when possible
	let res = await ai.getChatCompletion(chatArr, {
		stream: true,
		// Use the gpt-3.5-turbo model if the plan is empty
		model: (oriPlan == "")? "gpt-4e" : "gpt-4"
	}, streamHandler);
	
	// Return the completion
	return res.completion;
}