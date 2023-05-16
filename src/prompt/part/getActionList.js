const config = require("../../core/config")
const getPromptBlock = require("../builder/getPromptBlock");

/**
 * Get the action list
 */
module.exports = async function getActionList() {
	return getPromptBlock(
        "List of actions you the AI dev can do", 
        [
            `- Edit a file, with the given instructions`,
            `- Update spec from code`,
            `- Update code from spec`,
            `- Search an answer within a file`,
            `- Move files or folders`,
            `- Delete files or folders`,
        ].join("\n")
    );
}