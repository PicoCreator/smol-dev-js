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
			"list of various individual files in the src dir that you the AI dev need to update / generate / edit, according to the plan (relative to src dir) ...",
			"Do not include files you are not modifying as part of the plan ..."
		],
		"UPDATE_SPEC": [
			"list of various individual files in the spec dir that you the AI dev need to update / generate / edit, according to the plan (relative to spec dir, not the src dir) ...",
			"Do not include files you are not modifying as part of the plan ..."
		],
		"NPM_DEP_INSTALL": [
			"list of additional dependencies modules to install (that is not already listed) ...",
			"Do not include depencies that are already installed ..."
		],
		"LOCAL_DEP": [
			"list of local src code files, you will need information about (ie. their public interface), when updating the src code files ..."
		]
	};
	
	// Suggest an incremental change which you can do to improve the project
	promptArr.push([
		"We will now be splitting the task among multiple AI devs, each working on a different file, please provide the list of files that we will need to apply the plan on, and its related info",
		"This will be excuted in the following order: NPM_DEP_INSTALL, MOVE_*, DEL_*, UPDATE_SRC, UPDATE_SPEC",
		"",
		"Reply with a json object with the following format: ",
		JSON.stringify(EXAMPLE_JSON_FORMAT),
		"",
		"Return with only the JSON object, no explaination is required",
		"Do not modify files that are not part of the plan",
	]);
	
	// Lets ask, we opt for the economical 3.5-turbo when possible
	let res = await jsonObjectChatCompletion(
		promptArr.flat().join("\n"), 
		{
			model: "gpt-4"
		}
	);
	
	// Return the result
	return res.result;
}