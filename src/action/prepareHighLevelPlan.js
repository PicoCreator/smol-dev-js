const getProjectFileList = require("../prompt/part/getProjectFileList");

/**
 * Generate a high level plan from the current project state
 */
module.exports = async function prepareHighLevelPlan() {
	// Get the project file list
	let projectFileList = await getProjectFileList();
	
}