
//--------------
//
//  Dependencies
//
//--------------

const fs = require("fs")
const applyOperationFileMapFromPlan = require("../../ai/seq/applyOperationFileMapFromPlan");
const generateFilesFromPrompt = require("../../ai/seq/generateFilesFromPrompt");
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
	
	desc: "Start the interactive ai dev prompt session",
	aliases: "run",
	
	setup: (cmd) => {
		// No additional argument required
	},
	
	// Execute the run command
	run: async (argv, context) => {
		// Check for openAI key
		if( config?.config?.provider == null ) {
			OutputHandler.fatalError(`[sys] you are missing a chosen provider 'smol-dev-js setup' first instead`)
			process.exit(1);
		}

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

			// open a file called incremental.md in the current directory and get its contents
			if(promptReply.feedback=='md') {
				let incrementalNotes = fs.readFileSync("./incremental.md", "utf8");
				await generateFilesFromPrompt(incrementalNotes);
			} else {
				// Start the internal prompt process
				await generateFilesFromPrompt(promptReply.feedback);
			}
		}

		// Due to a bug with mongodb hanging connections, 
		// we need to exit the process, when the process is done
		process.exit(0);
	}
}