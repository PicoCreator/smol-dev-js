const fs = require('fs/promises');
const path = require('path');
const config = require('../../core/config');
const scanDirectory = require('../../util/scanDirectory');
const getSrcDirPath = require('../../core/getSrcDirPath');
const getSpecDirPath = require('../../core/getSpecDirPath');
const updateSpecSrcFilePair = require('../../ai/seq/updateSpecSrcFilePair');
const generateFilesFromPrompt = require('../../ai/seq/generateFilesFromPrompt');
const OutputHandler = require('../OutputHandler');

module.exports = {
	command: 'spec2code',
	desc: 'Generate or update code files based on the spec code files',
	run: async function spec2code(argv, context) {
		// Check for key
		if( config?.config?.provider == null ) {
			OutputHandler.fatalError(`[sys] you are missing a chosen provider 'smol-dev-js setup' first instead`)
			process.exit(1);
		}

		if( getSpecDirPath() == null ) {
			OutputHandler.standardRed("[sys]: No spec directory found configured, invalid command - Exiting ...");
			return;
		}

		// Premade prompt
		await generateFilesFromPrompt("Regenerate all code files which has the corresponding spec defined (ensure all files are updated)");
	
		// Finish operations
		// ---
		// Due to a bug with mongodb hanging connections, 
		// we need to exit the process, when the process is done
		process.exit(0);
	},
};