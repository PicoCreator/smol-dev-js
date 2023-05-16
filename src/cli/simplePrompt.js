const prompts = require('prompts');

/**
 * Simple wrap around the prompts library
 * with default handling of the "cancel" case
 **/
module.exports = async function simplePrompt(questions, opt = {}) {
	return await prompts(questions, Object.assign(
		{
			onCancel: () => {
				console.log("[sys] Exit command recieved, exiting...");
				process.exit(1);
			}
		},
		opt
	))
}