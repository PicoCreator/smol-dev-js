// Core deps
const ai = require("../core/ai");

// Prompt builder deps
const getProjectDependencyList = require("../prompt/part/getProjectSettings");
const getProjectFileList = require("../prompt/part/getProjectFileList");
const getShortDescription = require("../prompt/part/getShortDescription");

/**
 * Generate a high level plan from the current project state
 */
module.exports = async function prepareHighLevelPlan() {
	// Build the prompt
	let promptArr = [
		"You are an AI developer assitant who is trying to write a program that will generate code for the user based on their intent",
		"",
		"The following are some details of the project ...",
		"",
		await getShortDescription(),
		"",
		await getProjectDependencyList(),
		"",
		await getProjectFileList(),
		"",
	];
	
	// Suggest an incremental change which you can do to improve the project
	promptArr.push(
		"Please suggest an incremental change which you can do to improve the project",
		"if you are not sure, ask the user instead for what they want to do",
		"",
		"Assistant:"
	);

	// Lets ask
	let res = await ai.getChatCompletion(promptArr.join("\n"), {
		model: "gpt-4e"
	});
	console.log(res);
}