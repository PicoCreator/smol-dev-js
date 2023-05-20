// Core deps
const ai = require("../../core/aiBridge");

// Prompt builder deps
const getPromptBlock = require("../../prompt/builder/getPromptBlock");
const getMainDevSystemPrompt = require("../../prompt/part/getMainDevSystemPrompt");
const getChatCompletion = require("../call/getChatCompletion");

/**
 * Generate opening suggestions, at the start of the process
 */
module.exports = async function planDraft(oriPlan = "", usrReply = "", streamHandler=null) {
	// Build the system prompt
	let sysPromptArr = [
		await getMainDevSystemPrompt(null)
	];

	// ChatML format
	let chatArr = [
		{ "role": "system", "content": sysPromptArr.join("\n") },
		{ "role": "user", "content": "I would like to make changes to improve the system, please suggest a plan" },
		{ 
			"role": "assistant", 
			"content": oriPlan? (getPromptBlock( "The following is the current plan draft",oriPlan )): "Do you have something in mind?"
		},
		{ 
			"role": "user", "content": [
				getPromptBlock(
					"The following is feedback/instructions on improving the plan draft",
					usrReply
				)
			].join("\n")
		},
		{ 
			"role": "system", 
			"content": [
				"Update the plan draft using the given feedback/instructions",
				"Reply on, what you plan to do next, using the avaliable actions listed",
				"",
				"If there is something you want me the user to do, only because cannot do so, let me know as well",
				"If you plan to add or modify a file, indicate which files you plan to modify, and a short summary on what you plan to do",
				"(just a rough description would do, avoid code examples)",
				"",
				"Describe you plan in a short concise manner, using the actions you are permitted to do",
				"DO NOT repeat the provided README.md / NOTES.md , you can refrence them if needed",
				"DO NOT modify the specs files (ie. README.md / NOTES.md), unless very specifically instructed by the user/feedback/current to the plan",
				"If the user ask you to update a specific set of files, only update those files, unless instructed otherwise",
				"",
				"Unless requested to in the feedback, you do not need to provide rough outline of the code you plan to generate",
				"",
				"Keep the rest of the draft plan unchanged, unless the it was specified otherwise",
				"Reply with the full updated plan draft, on what you plan to do next",
				"",
				"You do not need to include anything but the updated plan",
				"You do not need to explain to me what you can do, I already know",
				"Do not include details from the system prompt (except the plan itself)",
				"",
				`MOST IMPORTANT OF ALL: every line of markdown you generate must be valid markdown code. Do not include code fences in your response`,
				"",
				"Begin generating the updated plan now.",
			].join("\n") 
		}
	]

	// Lets ask, we opt for the economical 3.5-turbo when possible
	let res = await getChatCompletion(chatArr, {
		stream: true,
		// Just use gpt-4, its more reliable
		model: "smart"
	}, streamHandler);
	
	// Return the completion
	return res.completion;
}