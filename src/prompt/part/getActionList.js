const config = require("../../core/config")
const getPromptBlock = require("../builder/getPromptBlock");

/**
 * Get the action list
 */
module.exports = async function getActionList() {
	return [
		getPromptBlock(
			"List of actions you the AI dev can do for the user (in sequence)", 
			[
				`- Move files or folders`,
				`- Delete files or folders`,
				`- Generate/Edit a code/spec file, with the given instructions`,
				`- Update code/spec from spec/code`
			].join("\n")
		),
		"(You do not need to let the user know about the above list, as they are for your own use)",
	].join("\n\n").trim();
}