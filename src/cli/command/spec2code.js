const fs = require('fs/promises');
const path = require('path');
const config = require('../../core/config');
const scanDirectory = require('../../util/scanDirectory');
const getSrcDirPath = require('../../core/getSrcDirPath');
const getSpecDirPath = require('../../core/getSpecDirPath');
const updateSpecSrcFilePair = require('../../ai/seq/updateSpecSrcFilePair');
const generateFilesFromPrompt = require('../../ai/seq/generateFilesFromPrompt');

module.exports = {
	command: 'spec2code',
	desc: 'Generate or update code files based on the spec code files',
	run: async function spec2code(argv, context) {

		if( getSpecDirPath() == null ) {
			console.error("[sys]: No spec directory found configured, invalid command - Exiting ...");
			return;
		}

		// Premade prompt
		await generateFilesFromPrompt("Regenerate all code files which has the corresponding spec files");
	
		// Finish operations
		// ---
		// Due to a bug with mongodb hanging connections, 
		// we need to exit the process, when the process is done
		process.exit(0);
	},
};