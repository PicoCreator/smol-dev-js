const fs = require('fs').promises;
const path = require('path');
const ai = require('../../core/ai');
const getSpecDirPath = require('../../core/getSpecDirPath');
const getSrcDirPath = require('../../core/getSrcDirPath');
const getPromptBlock = require('../../prompt/builder/getPromptBlock');
const getMainDevSystemPrompt = require('../../prompt/part/getMainDevSystemPrompt');
const readFileOrNull = require('../../util/readFileOrNull');

/**
 * Update the source code file or spec file based on the other file.
 */
async function updateSpecSrcFilePair(fileType, filePath) {

	// Sanity checks
	if (fileType !== 'src' && fileType !== 'spec') {
		throw new Error('Invalid fileType parameter. Must be "src" or "spec".');
	}

	// Current file paths and content
	let srcFilePath  = null;
	let specFilePath = null;
	
	// Handling of source code file update
	if (fileType === 'src') {
		srcFilePath  = filePath;
		specFilePath = filePath + '.md';
	} else {
		srcFilePath  = filePath.replace(/\.md$/, '');
		specFilePath = filePath;
	}

	// Get the respective full file path
	let fullSrcFilePath  = path.join(getSrcDirPath(), filePath);
	let fullSpecFilePath = path.join(getSpecDirPath(), specFilePath);

	// Lets try to read the respective file
	let srcFileContent = await readFileOrNull(fullSrcFilePath, "");
	let specFileContent = await readFileOrNull(fullSpecFilePath, "");

	// Build the system prompt
	// ---
	let promptArr = [
		await getMainDevSystemPrompt(null),
		"",
		`You will be making some changes to an existing ${fileType} file '${filePath}'`
	];

	// Lets prepare the respective prompt
	if(fileType === 'src') {
		throw "@TODO support for src files"
	} else {
		// Add the spec file
		promptArr.push([
			"",
			getPromptBlock(`The following is the current ${fileType} file '${filePath}' (to be updated)`, fullSpecFilePath),
			"",
			getPromptBlock(`And its corresponding source code file, to be used as reference (for updating the spec)`, srcFileContent),
			"",
			"Now that you have gotten all the details above",
			"",
			"Only write in markdown the updated specification file",
			"do not add any other explanation, only return valid markdown for that file type",
			"",
			"We have already broken up the program into per-file generation",
			`Now your job is to generate only the markdown for the file '${filePath}'`,
			"Make sure to have consistent filenames if you reference other files we are also generating",
			"",
			"Remember that you must obey 3 things: ",
			`	- you are generating markdown for the file ${filePath}`,
			`	- do not stray from the plan, or the names of the files and the dependencies we have shown above`,
			`	- MOST IMPORTANT OF ALL: every line of markdown you generate must be markdown code. Do not include code fences in your response`,
			"",
			"This is a Bad response:",
			"```markdown",
			'# Hello There',
			"```",
			"",
			"This is a Good response:",
			'# Hello There',
			"",
			"Begin generating the updated markdown now."
		]);
	}
	
	// Run it
	// ---
	let res = await ai.getChatCompletion(promptArr.flat().join("\n"), {
		stream: true,
		model: "gpt-4"
	});

	// Update the respective file
	if(fileType === 'src') {
		throw "@TODO support for src files"
	} else {
		await fs.writeFile(specFileContent, res.completion, "utf8");
	}
	
}

module.exports = updateSpecSrcFilePair;