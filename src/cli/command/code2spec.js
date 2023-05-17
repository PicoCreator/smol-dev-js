const fs = require('fs/promises');
const path = require('path');
const scanDirectory = require('../../util/scanDirectory');
const { getSrcDirPath, getSpecDirPath } = require('../../core');

module.exports = {
	command: 'code2spec',
	desc: 'Generate or update spec files based on the source code files',
	run: async function code2spec(argv, context) {
		const srcDirPath = getSrcDirPath();
		const specDirPath = getSpecDirPath();
	
		const srcFiles = await scanDirectory(srcDirPath, { nodir: true });
	
		for (const srcFile of srcFiles) {
			const srcFilePath = path.join(srcDirPath, srcFile);
			const specFilePath = path.join(specDirPath, srcFile.replace(/\.js$/, '.md'));
	
			const fileContent = await fs.readFile(srcFilePath, 'utf8');
			const fileSummary = `# ${srcFile}\n\n## Summary\n\n- File path: ${srcFilePath}\n\n`;
			const fileNotes = `## Notes\n\n- Source code file: ${srcFile}\n\n`;
	
			let specContent = fileSummary + fileNotes;
	
			try {
				const existingSpecContent = await fs.readFile(specFilePath, 'utf8');
				const notesIndex = existingSpecContent.indexOf('## Notes');
	
				if (notesIndex !== -1) {
					specContent = existingSpecContent.slice(0, notesIndex) + fileNotes;
				}
			} catch (err) {
				if (err.code !== 'ENOENT') {
					throw err;
				}
			}
	
			await fs.writeFile(specFilePath, specContent);
		}
	},
};