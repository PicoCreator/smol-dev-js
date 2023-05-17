// Core deps
const fs = require("fs");
const path = require("path");
const ai = require("../../core/ai");

// Prompt builder deps
const getProjectDependencyList = require("./getProjectSettings");
const getProjectFileList = require("./getProjectFileList");
const getShortDescription = require("./getShortDescription");
const getAiNotes = require("./getAiNotes");
const getActionList = require("./getActionList");
const getPromptBlock = require("../builder/getPromptBlock");
const config = require("../../core/config");
const getProjectSettings = require("./getProjectSettings");

/**
 * Generate opening suggestions, at the start of the process
 **/
module.exports = async function getMainDevSystemPrompt() {
	// Build the system prompt
	let sysPromptArr = [
		"You are an AI developer assitant who is trying to write a program that will generate code for the user based on their intent",
		"",
		"The following are some details of the project ...",
		"",
		await getShortDescription(),
		"",
		await getProjectSettings(),
		"",
		await getProjectDependencyList(),
		"",
		await getProjectFileList(),
		"",
		await getActionList(),
		"",
		await getAiNotes()
	];

	// Content of top level specs files
	if( config.config.spec_dir != null && config.config.spec_dir != "" ) {
		// Get the spec dir
		let cwd = process.cwd();
		let specDir = path.resolve(cwd, config.config.spec_dir);
		
		// Get the spec files
		let specMainReadme = "";
		let specMainNotes = "";

		try {
			specMainReadme = await fs.promises.readFile(path.resolve(specDir, "README.md"), "utf8");
		} catch(e) {
			// Ignore
		}
		try {
			specMainNotes = await fs.promises.readFile(path.resolve(specDir, "NOTES.md"), "utf8");
		} catch(e) {
			// Ignore
		}

		sysPromptArr.push([
			"Note: The following spec files content/notes maybe outdated",
			"",
			getPromptBlock("Top level spec file content (README.md)", specMainReadme),
			"",
			getPromptBlock("Top level spec file notes (NOTES.md)", specMainNotes)
		])
	}

    // Return the joined system prompt
    return sysPromptArr.flat().join("\n").trim();
}