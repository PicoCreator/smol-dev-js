const fs = require('fs').promises;
const path = require('path');
const getSpecDirPath = require('../../core/getSpecDirPath');
const getSrcDirPath = require('../../core/getSrcDirPath');

/**
 * Update the source code file or spec file based on the other file.
 */
async function updateSpecSrcFilePair(fileType, filePath) {

	// Sanity checks
	if (fileType !== 'src' && fileType !== 'spec') {
		throw new Error('Invalid fileType parameter. Must be "src" or "spec".');
	}

	// Handling of source code file update
	if (fileType === 'src') {
		// Content holders
		let srcFileContent = "";
		let specFileContent = "";
	
		// Current file paths and content
		let srcFilePath  = filePath;
		let specFilePath = path.basename(filePath, path.extname(filePath)) + '.md';
		let fullSrcFilePath  = path.join(getSrcDirPath(), filePath);
		let fullSpecFilePath = path.join(getSpecDirPath(), specFilePath);

		// Lets try to read the respective file
	} 
	
	// Handling of spec file update
	if (fileType === 'spec') {
		const srcFileBaseName = path.basename(filePath, path.extname(filePath));
		const srcFiles = await fs.readdir(getSrcDirPath());
		const srcFilePath = srcFiles.find(file => path.basename(file, path.extname(file)) === srcFileBaseName);

		if (!srcFilePath) {
			throw new Error('Corresponding source code file does not exist.');
		}

		const specFileContent = await fs.readFile(filePath, 'utf8');
		const fileContentMatch = specFileContent.match(/## Summary\n\n(.*?)\n\n## Notes\n\n/s);

		if (!fileContentMatch) {
			throw new Error('Invalid spec file format. Missing "Summary" and "Notes" sections.');
		}

		await fs.writeFile(path.join(getSrcDirPath(), srcFilePath), fileContentMatch[1]);
	}
}

module.exports = updateSpecSrcFilePair;