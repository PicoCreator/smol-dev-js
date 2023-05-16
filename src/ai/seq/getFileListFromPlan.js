// Core deps
const ai = require("../../core/ai");

// Prompt builder deps
const getPromptBlock = require("../../prompt/builder/getPromptBlock");
const getMainDevSystemPrompt = require("../../prompt/part/getMainDevSystemPrompt");
const jsonObjectChatCompletion = require("../call/jsonObjectChatCompletion");

/**
 * Given the current plan, prepare the file list
 */
module.exports = async function getFileListFromPlan(currentPlan) {
	// Build the system prompt
	let promptArr = [
		await getMainDevSystemPrompt(null)
	];

	// Add the original plan
	promptArr.push(
		getPromptBlock(
			"The following is the current plan you the AI developer has drafted, after several rounds of user feedback",
			currentPlan
		)
	);

	// Prepare the example format
	let EXAMPLE_JSON_FORMAT = {
		"MOVE_SRC": {
			"old filepath to file or dir (relative to src dir)": "new filepath"
		},
		"MOVE_SPEC": {
			"old filepath to file or dir (relative to spec dir)": "new filepath"
		},
		"DEL_SRC": [
			"list of files in the src dir to delete (relative to src dir) ..."
		],
		"DEL_SPEC": [
			"list of files in the spec dir to delete (relative to spec dir) ..."
		],
		"UPDATE_SRC": [
			"list of various individual files in the src dir to update / generate / edit (relative to src dir) ...",
			"you should exclude files you are not modifying ..."
		],
		"UPDATE_SPEC": [
			"list of various individual files in the spec dir to update / generate / edit (relative to spec dir, not the src dir) ...",
			"you should exclude files you are not modifying ..."
		],
		"NPM_DEP_INSTALL": [
			"list of additional dependencies modules to install (that is not already listed) ...",
			"you should exclude deps that were already installed ..."
		],
		"LOCAL_DEP": [
			"list of local src code files, you will need information about (ie. their public interface), when updating the src code files ..."
		]
	};
	
	// Suggest an incremental change which you can do to improve the project
	promptArr.push([
		"We will now be splitting the task among multiple AI devs, each working on a different file, please provide the list of files that we will need to apply the plan on, and its related info",
		"",
		"Reply with a json object with the following format: ",
		JSON.stringify(EXAMPLE_JSON_FORMAT),
		"",
		"Return with only the JSON object, no explaination is required"
	]);
	
	// Lets ask, we opt for the economical 3.5-turbo when possible
	let res = await jsonObjectChatCompletion(
		promptArr.flat().join("\n"), 
		{
			model: "gpt-4"
		}
	);
	console.log(res);
	
	// Return the completion
	return res.completion;
}