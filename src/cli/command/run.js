
//--------------
//
//  Dependencies
//
//--------------

const fs = require("fs")
const applyOperationFileMapFromPlan = require("../../ai/seq/applyOperationFileMapFromPlan");
const getOperationFileMapFromPlan = require("../../ai/seq/getOperationFileMapFromPlan");
const makeUpdatedNotes = require("../../ai/seq/makeUpdatedNotes");
const openingSuggestion = require("../../ai/seq/openingSuggestion");
const planDraft = require("../../ai/seq/planDraft");
const config = require("../../core/config");
const getPromptBlock = require("../../prompt/builder/getPromptBlock");
const OutputHandler = require("../OutputHandler");
const simplePrompt = require("../simplePrompt");

//--------------
//
//  Command Definition
//
//--------------

module.exports = {
	
	desc: "Start the interactive ai dev session",
	
	setup: (cmd) => {
		// No additional argument required
	},
	
	// Execute the run command
	run: async (argv, context) => {

		// Lets ask the user what it wants to do
		console.log("--------------------")
		console.log("🐣 [ai]: hi its me, the ai dev ! you said you wanted")
		console.log(`         here to help you with your project, which is a ....`)
		console.log("--------------------")
		console.log(`${config.config.short_description}`)
		console.log("--------------------")

		// Lets setup the main prompt, to action loop
		while(true) {
			// Starting
			console.log("🐣 [ai]: What would you like me to do? (PS: this is not a chat system, there is no chat memory prior to this point)")

			// Ask the user for input
			let promptReply = await simplePrompt({
				type: "text",
				name: "feedback",
				message: "[you]: ",
				initial: "Suggest something"
			});

			// The current plan to iterate on
			let currentPlan = "";

			// Lets iterate on a plan
			while(true) {
				process.stdout.write("🐣 [ai]: ");
				let res = await planDraft(currentPlan, promptReply.feedback, (res) => {
					process.stdout.write(res)
				});
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

				// Log the reflecting state
				console.log("🐣 [ai]: Reflecting on the feedback...")

				// Update the notes
				await makeUpdatedNotes([
					getPromptBlock(
						"The the AI assistant previously drafted with the above notes",
						currentPlan
					),
					"",
					getPromptBlock(
						"The following is feedback on how to improve the draft",
						promptReply.feedback
					),
				].join("\n"));
			}

			console.log("🐣 [ai]: Working on the plan ...")

			// - Ask for the list files to be moved, deleted
			// - list of local code files to be added/generated/updated
			// - list of local code files, you have dependencies on for the changes you want to make
			// - list of spec files to be added/generated/updated
			let operationsMap = await getOperationFileMapFromPlan(currentPlan);

			// Lets execute it
			await applyOperationFileMapFromPlan(currentPlan, operationsMap)
			

			// Yay now that we got the current plan
			console.log(operationsMap)
			break;
		}

		// Due to a bug with mongodb hanging connections, 
		// we need to exit the process, when the process is done
		process.exit(0);
	}
}