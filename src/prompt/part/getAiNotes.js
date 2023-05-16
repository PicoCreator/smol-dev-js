const fs = require("fs")
const path = require("path")
const getPromptBlock = require("../builder/getPromptBlock");

/**
 * Get the AI working notes
 */
module.exports = async function getAiNotes(contextFilePath) {
	// Get the CWD & notes dir
	const cwd = process.cwd();
	const notesDir = path.resolve(cwd, "./.my-ai-dev/notes");

	// The final return string arr to build
	let returnStringArr = [
		"Note: that AI notes provided are internal only, for your own use.",
		""
	];

	// Get the ROOT AI notes
	let rootNoteMD = "";
	try {
		rootNoteMD = await fs.promises.readFile(
			path.resolve(notesDir, "./ROOT.md"), 
			"utf-8"
		);
	} catch(e) {
		// Do nothing
	}

	// Add the root note
	returnStringArr.push(
		await getPromptBlock("AI notes for the overall project", rootNoteMD)
	);

	// @TODO : support AI notes for selected file / dir

	// Return the joint string
	return returnStringArr.join("\n\n").trim();
}