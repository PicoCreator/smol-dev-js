
//--------------
//
//  Dependencies
//
//--------------

const fs = require("fs")
const prompts = require('prompts');
const openingSuggestion = require("../../ai/seq/openingSuggestion");
const planDraft = require("../../ai/seq/planDraft");
const config = require("../../core/config");
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
			console.log("🐣 [ai]: What would you like me to do?")
			// // Provide the opening suggestion
			// let opening = await openingSuggestion();
			// OutputHandler.standardGreen("[ai]: "+opening);

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
					initial: true
				});
				if( promptReply.approve ) {
					break;
				}

				// Ask the user for input
				promptReply = await simplePrompt({
					type: "text",
					name: "feedback",
					message: "[you]: What would you like to change?",
					initial: true
				});
			}
		}
	}
}