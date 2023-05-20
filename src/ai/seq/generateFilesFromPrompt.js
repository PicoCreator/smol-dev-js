
//--------------
//
//  Dependencies
//
//--------------

const fs = require("fs")
const applyOperationFileMapFromPlan = require("./applyOperationFileMapFromPlan");
const getOperationFileMapFromPlan = require("./getOperationFileMapFromPlan");
const makeUpdatedNotes = require("./makeUpdatedNotes");
const openingSuggestion = require("./openingSuggestion");
const planDraft = require("./planDraft");
const config = require("../../core/config");
const getPromptBlock = require("../../prompt/builder/getPromptBlock");
const OutputHandler = require("../../cli/OutputHandler");
const simplePrompt = require("../../cli/simplePrompt");

//--------------
//
//  Command Definition
//
//--------------

module.exports = async function generateFilesFromPrompt(prompt) {
	// The current plan to iterate on
	let currentPlan = "";

	// The prompt history
	let promptHistory = [];

	// Current prompt to use
	let currentPrompt = prompt;

	// Lets iterate on a plan
	while(true) {
		process.stdout.write("🐣 [ai]: ");
		let res = await planDraft(
			currentPlan, 
			promptHistory,
			currentPrompt, 
			(res) => {
				process.stdout.write(res)
			}
		);
		// Add the current prompt to the history chain
		promptHistory.push(currentPrompt)

		// Save the updated plan
		console.log("");
		currentPlan = res;

		// Ask the user for input
		promptReply = await simplePrompt({
			type: "confirm",
			name: "approve",
			message: "[you]: Proceed with the plan?",
			initial: false
		});

		// Check for further clarification?
		if( promptReply.approve ) {
			// @TODO check with the AI needs further clarification
			break;
		}

		// Ask the user for input
		promptReply = await simplePrompt({
			type: "text",
			name: "feedback",
			message: "[you]: What would you like to change?"
		});
		currentPrompt = promptReply.feedback;

		// Log the reflecting state
		console.log("🐣 [ai]: Reflecting on the feedback...")

		// Update the notes
		await makeUpdatedNotes([
			getPromptBlock(
				"The the AI assistant previously drafted this plan (and feedback in history) with the above notes",
				currentPlan
			),
			"",
			getPromptBlock(
				"The following is the user feedback history used for the current plan (in json array)",
				JSON.stringify(promptHistory)
			),
			"",
			getPromptBlock(
				"The following is the user feedback to the current plan",
				currentPrompt
			)
		].join("\n"));
	}

	console.log("🐣 [ai]: Working on the plan ...")

	// - Ask for the list files to be moved, deleted
	// - list of local code files to be added/generated/updated
	// - list of local code files, you have dependencies on for the changes you want to make
	// - list of spec files to be added/generated/updated
	let operationsMap = await getOperationFileMapFromPlan(currentPlan, promptHistory);

	// Lets execute it
	await applyOperationFileMapFromPlan(currentPlan, operationsMap, promptHistory)
	
	// And finish
}
