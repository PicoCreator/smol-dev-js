const scanDirectory = require('../fs/scanDirectory');

/**
 * Generate a high level plan from the current project state
 */
module.exports = async function prepareHighLevelPlan() {
	// Scan the current CWD
	let files = await scanDirectory(process.cwd(), { treeString:true });

	console.log(files
	)
}