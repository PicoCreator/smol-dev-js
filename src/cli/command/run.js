
//--------------
//
//  Dependencies
//
//--------------

const fs = require("fs")
const prompts = require('prompts');
const openingSuggestion = require("../../action/openingSuggestion");
const config = require("../../core/config");
const OutputHandler = require("../OutputHandler");

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
		console.log("[ai]: hi its me, 🐣 the ai dev 🐣! you said you wanted")
		console.log(`      here to help you with your project, which is a ....`)
		console.log("--------------------")
		console.log(`${config.config.short_description}`)
		console.log("--------------------")
		console.log("[ai]: thinking ...")

		// Lets setup the main prompt, to action loop
		while(true) {
			// Provide the opening suggestion
			let opening = await openingSuggestion();
			OutputHandler.standardGreen("[ai]: "+opening);

			// Ask the user for input
			let promptConfig = await prompts({
				type: "text",
				name: "input",
				message: "[you]: ",
			});
		}
	}
}