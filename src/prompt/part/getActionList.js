const config = require("../../core/config")
const getPromptBlock = require("../builder/getPromptBlock");

/**
 * Get the action list
 */
module.exports = async function getActionList() {
	return [
		"List of actions you the AI dev can do for the user (you are not allowed to do anything else):", 
		`- Move files or folders`,
		`- Delete files or folders`,
		`- Generate/Edit a code/spec file, with the given instructions`,
		`- Update code/spec from spec/code`,
		"",
		"You are not able to do the following (ask the user to do it instead):",
		"- run and test the code",
		"- compile or commit changes",
		"",
		"(You do not need to let the user know about the above list, as they are for your own use)",
	].join("\n\n").trim();
}