const config = require("../../core/config")
const getPromptBlock = require("../builder/getPromptBlock");

/**
 * Get the project short description that was configured
 */
module.exports = async function getShortDescription() {
	return getPromptBlock("Project short description", config.config.short_description || "");
}
