// Core deps
const ai = require("../../core/aiBridge");

// Prompt builder deps
const getMainDevSystemPrompt = require("../../prompt/part/getMainDevSystemPrompt");
const getChatCompletion = require("../call/getChatCompletion");

/**
 * Generate opening suggestions, at the start of the process
 */
module.exports = async function openingSuggestion() {
	// Build the prompt
	let promptArr = [
		await getMainDevSystemPrompt(null)
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
	let res = await getChatCompletion(promptArr.join("\n"), {
		stream: true,
		model: "economical"
	});
	
	// Return the completion
	return res.completion;
}