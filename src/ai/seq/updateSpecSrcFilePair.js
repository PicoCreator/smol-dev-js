const fs = require('fs').promises;
const path = require('path');
const getSpecDirPath = require('../../core/getSpecDirPath');
const getSrcDirPath = require('../../core/getSrcDirPath');

async function updateSpecSrcFilePair(fileType, filePath) {
	if (fileType !== 'src' && fileType !== 'spec') {
		throw new Error('Invalid fileType parameter. Must be "src" or "spec".');
	}

	try {
		await fs.access(filePath);
	} catch (err) {
		throw new Error('Invalid filePath parameter. File does not exist.');
	}

	if (fileType === 'src') {
		const specFilePath = path.join(getSpecDirPath(), path.basename(filePath, path.extname(filePath)) + '.md');
		const fileContent = await fs.readFile(filePath, 'utf8');
		let specFileContent = `# ${path.basename(filePath)}\n\n## Summary\n\n## Notes\n\n`;

		try {
			await fs.access(specFilePath);
			const existingSpecFileContent = await fs.readFile(specFilePath, 'utf8');
			specFileContent = existingSpecFileContent.replace(/## Summary\n\n(.*?)\n\n## Notes\n\n/s, `## Summary\n\n${fileContent}\n\n## Notes\n\n`);
		} catch (err) {
			// Spec file does not exist, create a new one
		}

		await fs.writeFile(specFilePath, specFileContent);
	} else if (fileType === 'spec') {
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