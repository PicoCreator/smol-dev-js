
//--------------
//
//  Dependencies
//
//--------------

const fs = require("fs")
const prompts = require('prompts');
const prepareHighLevelPlan = require("../../action/prepareHighLevelPlan");
const config = require("../../core/config");

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

		// // Ask for instruction
		// let prompt = await prompts({
		// 	type: 'text',
		// 	name: 'prompt',
		// 	message: '[ai]: What would you like me to do?'
		// }, {
		// 	onCancel: () => {
		// 		console.log("Exit command recieved, exiting...");
		// 		process.exit(1);
		// 	}
		// });

		await prepareHighLevelPlan();
	}
}