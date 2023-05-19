// Core deps
const fs = require("fs")
const path = require("path")

// Prompt builder deps
const getPromptBlock = require("../../prompt/builder/getPromptBlock");
const getAiNotes = require("../../prompt/part/getAiNotes");
const getMainDevSystemPrompt = require("../../prompt/part/getMainDevSystemPrompt");
const getChatCompletion = require("../call/getChatCompletion");
const jsonObjectChatCompletion = require("../call/jsonObjectChatCompletion");

/**
 * Generate opening suggestions, at the start of the process
 */
module.exports = async function updateNotes(addditionalInfo) {
	// Skip if additional info is not provided
	if( addditionalInfo == null || addditionalInfo.trim() == "" ) {
		return;
	}
	// Build the system prompt
	let sysPromptArr = [
		await getMainDevSystemPrompt(null)
	];

	// Instruction for updating the notes
	let sysInstructionArr = [
		"Given the additional information from the user, extract the information that was missing from the original notes, which would be added to the 'AI notes' to improve your answers",
		"",
		"Respond with only the missing information, in as little words as possible",
		"be short and concise, indicate the relevent file/information, and generalise all other information",
		"You do not need to thank the user", 
		"you do not need to say 'The missing information is'",
		"",
		"Notes are to improve your knowledge and understanding, not to store your plans",
		"Your plans are being tracked separately, and will be used to generate the next set of instructions",
		"",
		"Respond with NO_CHANGE_TO_NOTES , if there is no additional information that needs to be added to the notes",
	];
	
	// ChatML format
	let chatArr = [
		{ "role": "system", "content": sysPromptArr.flat().join("\n") },
		{ "role": "system",  "content": addditionalInfo },
		{ "role": "system", "content": sysInstructionArr.flat().join("\n") }
	]

	// Lets ask, we opt for the economical 3.5-turbo when possible
	let res = await getChatCompletion(
		chatArr, 
		{ 
			model: "smart",
			max_tokens: 1000
		}
	);
	let notesChange = res.completion;

	// If the response contains NO_CHNAGE, return and do nothing
	if( notesChange.includes("NO_CHANGE_TO_NOTES") ) {
		return;
	}
	
	// Lets perform the notes update
	let updatePrompt = [
		await getAiNotes(),
		"",
		getPromptBlock("Update the AI notes with the following information", notesChange),
		"",
		"Respond with only the notes content, as your entire response will be used to update the notes",
		"Respond with NO_CHANGE_TO_NOTES instead if no changes are needed",
		"Remove phrases like 'the missing information is ...'",
		"Remove phrases like 'update the notes with ...'",
		"Re-Order your notes in accordence to importance",
		"Use notes only to record new information from feedback you previously didn't know",
		"",
		"Limit your notes / response to about 1000 tokens, compression/dropping less important information if needed",
		"",
		"Respond with only the notes content, your entire response will be used to update the notes",
		"Respond without code wrapping blocks, your entire response will be used to update the notes",
	].join("\n") 

	res = await getChatCompletion(
		updatePrompt, 
		{ 
			model: "smart",
			max_tokens: 1000
		}
	);
	let notes = res.completion;

	// Lets trim the content and remove wierd blocks
	notes = notes.trim();
	
	notes = notes.replaceAll("```","");
	notes = notes.replaceAll("<<{{~~}}>>","");
	notes = notes.replaceAll("<<{{--}}>>","");

	// If the response contains NO_CHANGE_TO_NOTES, return and do nothing
	if( notes.includes("NO_CHANGE_TO_NOTES") ) {
		return;
	}

	// Get the CWD & notes dir
	const cwd = process.cwd();
	const notesDir = path.resolve(cwd, "./.smol-dev-js/");

	// Lets perform the notes update
	await fs.promises.writeFile(path.resolve(notesDir,"AI-NOTES.md"), notes, "utf-8")

	// Finish the update
	return;
}