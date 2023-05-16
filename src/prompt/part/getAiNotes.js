const fs = require("fs")
const path = require("path")
const getPromptBlock = require("../builder/getPromptBlock");

/**
 * Get the AI working notes
 */
module.exports = async function getAiNotes() {
	// Get the CWD & notes dir
	const cwd = process.cwd();
	const notesDir = path.resolve(cwd, "./.my-ai-dev/");

	// The final return string arr to build
	let returnStringArr = [
		"Note: that AI notes provided are internal only, for your own use. Parts of it maybe outdated",
		""
	];

	// Get the ROOT AI notes
	let rootNoteMD = "";
	try {
		rootNoteMD = await fs.promises.readFile(
			path.resolve(notesDir, "./AI-NOTES.md"), 
			"utf-8"
		);
	} catch(e) {
		// Do nothing
	}

	// Add the root note
	returnStringArr.push(
		await getPromptBlock("'AI notes' for the overall project", rootNoteMD)
	);

	// Return the joint string
	return returnStringArr.join("\n\n").trim();
}