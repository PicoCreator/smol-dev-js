const fs = require("fs");
const path = require("path");
const getPromptBlock = require("../builder/getPromptBlock");
const readFileOrNull = require("../../util/readFileOrNull");

/**
 * Get the AI working notes
 */
module.exports = async function getAiNotes() {
	// Get the CWD & notes dir
	const cwd = process.cwd();
	const notesDir = path.resolve(cwd, "./.smol-dev-js/");

	// The final return string arr to build
	let returnStringArr = [
		"Note: that AI notes provided are internal only, for your own use. Parts of it maybe outdated",
		""
	];

	// Get the ROOT AI notes
	const rootNoteMDPath = path.resolve(notesDir, "./AI-NOTES.md");
	const rootNoteMD = await readFileOrNull(rootNoteMDPath, "utf-8");

	// Add the root note if it exists
	if (rootNoteMD) {
		returnStringArr.push(
			await getPromptBlock("'AI notes' for the overall project", rootNoteMD)
		);
	}

	// Return the joint string
	return returnStringArr.join("\n\n").trim();
};