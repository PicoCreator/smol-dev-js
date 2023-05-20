// Core deps
const getSpecDirPath = require("../../core/getSpecDirPath");

// Prompt builder deps
const getPromptBlock = require("../../prompt/builder/getPromptBlock");
const getMainDevSystemPrompt = require("../../prompt/part/getMainDevSystemPrompt");
const jsonObjectChatCompletion = require("../call/jsonObjectChatCompletion");

/**
 * Given the current plan, prepare the file list
 */
module.exports = async function getOperationFileMapFromPlan(currentPlan, promptHistory=[]) {
	// Build the system prompt
	let promptArr = [
		await getMainDevSystemPrompt(null)
	];
	
	// Add the original plan
	promptArr.push(
		getPromptBlock(
			"The following is the current plan you the AI developer has drafted, after several rounds of user feedback",
			currentPlan
		),
		"",
		getPromptBlock(
			"The following is prompt history for the current plan (in json array)",
			JSON.stringify(promptHistory)
		),
	);

	// Prepare the example format
	let EXAMPLE_JSON_FORMAT = {
		"0_NPM_DEP_INSTALL": [
			"list of additional dependencies modules to install (that is not already listed) ...",
			"Do not include depencies that are already installed ..."
		],
		"1_MOVE_SRC": {
			"old filepath to file or dir (relative to src dir)": "new filepath"
		},
		"1_MOVE_SPEC": {
			"old filepath to file or dir (relative to spec dir)": "new filepath"
		},
		"2_DEL_SRC": [
			"list of files in the src dir to delete (relative to src dir) ..."
		],
		"2_DEL_SPEC": [
			"list of files in the spec dir to delete (relative to spec dir) ..."
		],
		"3_UPDATE_SRC": [
			"list of various individual files in the src dir that you the AI dev need to update / generate / edit, according to the plan (relative to src dir) ...",
			"Do not include files you are not modifying as part of the plan ..."
		],
		"3_UPDATE_SPEC": [
			"list of various individual files in the spec dir that you the AI dev need to update / generate / edit, according to the plan (relative to spec dir, not the src dir) ...",
			"Do not include files you are not modifying as part of the plan ..."
		],
		"4_UPDATE_SRC": [
			"similar to 3_* varient"
		],
		"4_UPDATE_SPEC": [
			"similar to 3_* varient"
		],
		"LOCAL_DEP": [
			"list of local src code files, you will need information about (ie. their public interface), when updating the src code files ..."
		]
	};

	// Drop the spec related stuff if its disabled
	if( getSpecDirPath() == null ) {
		delete EXAMPLE_JSON_FORMAT["1_MOVE_SPEC"];
		delete EXAMPLE_JSON_FORMAT["2_DEL_SPEC"];
		delete EXAMPLE_JSON_FORMAT["3_UPDATE_SPEC"];
		delete EXAMPLE_JSON_FORMAT["4_UPDATE_SPEC"];
	}
	
	// Suggest an incremental change which you can do to improve the project
	promptArr.push([
		"We will now be splitting the task among multiple AI devs, each working on a different file, please provide the list of files that we will need to apply the plan on, and its related info",
		"This will be excuted in the following order: 0_NPM_DEP_INSTALL, 1_MOVE_*, 2_DEL_*, 3_UPDATE_*, 4_UPDATE_*",
		"",
		"Numbers indicate the sequence in which the operations will be done. Items with the same numbers are done in parallel",
		"",
		"3_UPDATE_* and 4_UPDATE_* are functionally the same, but lets you decide the order in which you want to update the files",
		"When an AI dev is updated a spec/code file, the AI dev will be given the details for the corresponding spec/code file",
		"And public interface details of the local dep you provided",
		"",
		"Avoid modifying any of the specification file (ie. README.md, NOTES.md), unless specifically instructed to do so, as that should be managed by the user.",
		"",
		"Reply with a json object with the following format: ",
		JSON.stringify(EXAMPLE_JSON_FORMAT),
		"",
		"Return with only the JSON object, no explaination is required",
		"Do not modify files that are not part of the plan",
	]);
	
	// Lets ask, and get the operation file map
	let res = await jsonObjectChatCompletion(
		promptArr.flat().join("\n"), 
		{
			model: "smart"
		}
	);
	
	// Return the result
	return res.result;
}