// Core deps
const fs = require("fs");
const path = require("path");
const getSrcDirPath = require("../../core/getSrcDirPath");
const simpleAndSafeMinify = require("../../prompt/filter/simpleAndSafeMinify")

// Prompt builder deps
const getPromptBlock = require("../../prompt/builder/getPromptBlock");
const getChatCompletion = require("../call/getChatCompletion");
const ai = require("../../core/aiBridge");

/**
 * Given the current plan, prepare the file list
 */
module.exports = async function getLocalDepSummary(srcPath) {
	// Get the src path
	const srcDir = getSrcDirPath();
	const srcFile = path.resolve(srcDir, srcPath);

	// Check if src file is in src dir
	if( !srcFile.startsWith(srcDir) ) {
		throw new Error("srcPath must be a file in the src directory");
	}

	// Get the code file
	let codeFile = "";
	try {
		codeFile = (await fs.promises.readFile(srcFile, "utf8")).trim();
	} catch(e) {
		// Ignore
	}

	// Return blank, for blank
	if( codeFile == "" ) {
		// Log the request
		return "";
	}

	// Get the simple and safe minify varient
	let simpleMinify = simpleAndSafeMinify(codeFile);
	let simpleMinifyTokenCount = ai.getTokenCount(simpleMinify);

	// Prompt array building
	let promptArr = [
		getPromptBlock(`The following is the incomplete source code for ${srcPath}`, codeFile),
		"",
		"Please extract out all the public functions and classes, exposed and/or exported, and remove the rest",
		"This will be used by an AI assistant to understand how to use the file",
		"If replying with code, you must reply with minified code",
		"You do not need to list dependencies, unless it is being exposed/exported",
		"If a function is not being exposed/exported, you do not need to include it",
		"",
		"do not add any other explanation, reply with only details needed to use the code, in as few lines as possible",
		"do not add markdown code block wrapping to your answer, as it will be added automatically",
		"",
	]

	// Log the request
	// console.log("AI request: getLocalDepSummary", promptArr.join("\n").trim());

	// Perform the AI request
	let aiRes = await getChatCompletion(promptArr.join("\n").trim(), {
		model: "economical"
	});
	// Get the ai response
	let aiSummary = aiRes.completion;
	let aiSummaryTokenCount = ai.getTokenCount(aiSummary);

	// Chose and return the lower token count
	if( aiSummaryTokenCount < simpleMinifyTokenCount ) {
		return aiSummary;
	} else {
		return simpleMinify;
	}
}