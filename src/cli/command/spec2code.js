const fs = require('fs/promises');
const path = require('path');
const config = require('../../core/config');
const scanDirectory = require('../../util/scanDirectory');
const getSrcDirPath = require('../../core/getSrcDirPath');
const getSpecDirPath = require('../../core/getSpecDirPath');
const updateSpecSrcFilePair = require('../../ai/seq/updateSpecSrcFilePair');

module.exports = {
	command: 'spec2code',
	desc: 'Generate or update code files based on the spec code files',
	run: async function spec2code(argv, context) {

		// Updating the spec files
		console.log("🐣 [ai]: Updating the spec files ...");

		// Get the list of source files
		const specFiles = await scanDirectory(
			getSpecDirPath(), 
			{ 
				exclude: config.config?.src_exclude, 
				include: config.config?.src_include 
			}
		);
	
		// Async promise array
		const promiseArr = [];

		// Lets update the spec files in parallel
		for (const specFile of specFiles) {
			// Skip folders
			if (specFile.endsWith("/")) {
				continue;
			}

			// Get the src file path, withoout the ".md"
			const srcFile = specFile.slice(0, -3);

			// Update the spec file
			console.log(`🐣 [ai]: (async) Updating spec file - ${srcFile}`)
			promiseArr.push(
				updateSpecSrcFilePair("src", srcFile)
			);
		}

		// Wait for all the promises to resolve
		console.log(`🐣 [ai]: Awaiting of ${promiseArr.length} async spec file update`);
		await Promise.all(promiseArr);
		console.log(`🐣 [ai]: Finished current set of async spec file update`)
	
		// Finish operations
		// ---
		// Due to a bug with mongodb hanging connections, 
		// we need to exit the process, when the process is done
		process.exit(0);
	},
};