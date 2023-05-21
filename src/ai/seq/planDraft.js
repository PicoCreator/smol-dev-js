// Core deps
const fs = require("fs");
const path = require("path");
const ai = require("../../core/aiBridge");
const config = require("../../core/config");
const getSpecDirPath = require("../../core/getSpecDirPath");

// Prompt builder deps
const getPromptBlock = require("../../prompt/builder/getPromptBlock");
const getMainDevSystemPrompt = require("../../prompt/part/getMainDevSystemPrompt");
const readFileOrNull = require("../../util/readFileOrNull");
const getChatCompletion = require("../call/getChatCompletion");
const jsonObjectChatCompletion = require("../call/jsonObjectChatCompletion");
const getLocalDepSummary = require("./getLocalDepSummary");

/**
 * Generate opening suggestions, at the start of the process
 */
module.exports = async function planDraft(oriPlan = "", promptHistory=[], usrReply = "", streamHandler=null) {
	// Build the system prompt
	let sysPromptArr = [
		await getMainDevSystemPrompt(null)
	];

	// First round chat arr, which i
	let chatArrPrefix = [
		{ "role": "system", "content": sysPromptArr.join("\n") },
		{ "role": "user", "content": "I would like to make changes to improve the system, please suggest a plan" },
		{ 
			"role": "assistant", 
			"content": oriPlan? (getPromptBlock( "The following is the current plan draft",oriPlan )): "Do you have something in mind?"
		},
		{ 
			"role": "user", "content": [
				getPromptBlock(
					"The following is the user feedback history used for the current plan (in json array)",
					JSON.stringify(promptHistory)
				),
				"",
				getPromptBlock(
					"The following is feedback/instructions on improving the plan draft",
					usrReply
				)
			].join("\n")
		}
	];

	// ChatML format, which usese the same basic strucutre
	let finalChatArr = chatArrPrefix.slice();

	// Check if we are using the antropic provider, where we can handle larger context size
	if( config.config?.provider == "anthropic" || config.config?.gpt4_32k == true ) {
		// Lets ask for what files it would like to find out to imrove the plan
		let chatArrToAskForFiles = chatArrPrefix.slice();

		// Prepare the example format
		let EXAMPLE_JSON_FORMAT = {
			"SPEC_LIST": [
				"list of local spec files, you will need information about, when updating the spec code files ..."
			],
			"SRC_LIST": [
				"list of local src code files, you will need information about (ie. their public interface), when updating the src code files ..."
			]
		};

		// Remove the spec list, if the spec dir is not avaliable
		const specDir = getSpecDirPath();
		if( specDir == null ) {
			delete EXAMPLE_JSON_FORMAT["SPEC_LIST"];
		}
		
		// Add the prompt to ask for files
		chatArrToAskForFiles.push(
			{
				"role": "system",
				"content": [
					"Please list the files you would like to find out more, to modify the plan",
					"",
					"We will be getting these files for you, to help better update the plan",
					"",
					"Reply with a json object with the following format: ",
					JSON.stringify(EXAMPLE_JSON_FORMAT),
					"",
					"Return with only the JSON object, no explaination is required",
					"Do not modify files that are not part of the plan",
				].join("\n")
			}
		);

		// Lets ask, and get the operation file map
		let fileListObj = await jsonObjectChatCompletion(
			chatArrToAskForFiles.flat().join("\n"), 
			{
				model: "smart"
			}
		);

		// Lets get the src / spec file
		let SPEC_LIST = fileListObj.result["SPEC_LIST"] || [];
		let SRC_LIST = fileListObj.result["SRC_LIST"] || [];

		// Spec / Src to content map
		let specFileContentMap = {};
		let srcFileContentMap = {};
		
		// Get the spec file content
		let specPromiseArr = Promise.all(
			SPEC_LIST.map(async (specFilePath) => {
				specFileContentMap[specFilePath] = await readFileOrNull(path.resolve(specDir, specFilePath));
			})
		);

		// Get the src file content
		let srcPromiseArr = Promise.all(
			SRC_LIST.map(async (srcFilePath) => {
				srcFileContentMap[srcFilePath] = await getLocalDepSummary(srcFilePath);
			})
		);

		// Await for the promises to resolve
		await specPromiseArr;
		await srcPromiseArr;

		// Lets build the additional info list
		let additionalInfoList = [];

		// Add the spec file content
		for(let specPath in specFileContentMap) {
			additionalInfoList.push(getPromptBlock(
				`spec file at: ${specPath}`,
				specFileContentMap[specPath]
			));
		}
		// Add the src file content
		for(let srcPath in srcFileContentMap) {
			additionalInfoList.push(getPromptBlock(
				`summary of src file at: ${srcPath}`,
				srcFileContentMap[srcPath]
			));
		}

		// The additional info str
		let additionalInfoStr = additionalInfoList.join("\n\n");
		
		// Add to the final chat arr
		finalChatArr.push(
			{
				"role": "system",
				"content": [
					"Here is the additional information you requested for the various src/spec files, that you requested in a seperate process, to improve the current plan ...",
					"",
					additionalInfoStr
				].join("\n")
			}
		);
	}

	// The final plan update process
	finalChatArr.push(
		{ 
			"role": "system", 
			"content": [
				"Update the plan draft using the given feedback/instructions",
				"Reply on, what you plan to do next, using the avaliable actions listed",
				"",
				"If there is something you want me the user to do, only because cannot do so, let me know as well",
				"If you plan to add or modify a file, indicate which files you plan to modify, and a short summary on what you plan to do",
				"(just a rough description would do, avoid code examples)",
				"",
				"Describe you plan in a short concise manner, using the actions you are permitted to do",
				"DO NOT repeat the provided README.md / NOTES.md , you can refrence them if needed",
				"DO NOT modify the specs files (ie. README.md / NOTES.md), unless specifically instructed by the user/feedback/current to the plan",
				"DO NOT delete any files, unless specifically instructed by the user/feedback/current to the plan",
				"If the user ask you to update a specific set of files, only update those files, unless instructed otherwise",
				"",
				"Unless requested to in the feedback, you do not need to provide rough outline of the code you plan to generate",
				"",
				"Keep the rest of the draft plan unchanged, unless the it was specified otherwise",
				"Reply with the full updated plan draft, on what you plan to do next",
				"",
				"You do not need to include anything but the updated plan",
				"You do not need to explain to me what you can do, I already know",
				"Do not include details from the system prompt (except the plan itself)",
				"",
				`MOST IMPORTANT OF ALL: every line of markdown you generate must be valid markdown code. Do not include code fences in your response`,
				"",
				"Begin generating the updated plan now.",
			].join("\n") 
		}
	);

	// console.log(finalChatArr);

	// Lets ask, we opt for the economical 3.5-turbo when possible
	let res = await getChatCompletion(
		finalChatArr, 
		{
			stream: true,
			// Just use gpt-4, its more reliable
			model: "smart"
		}, 
		streamHandler
	);
	
	// Return the completion
	return res.completion;
}