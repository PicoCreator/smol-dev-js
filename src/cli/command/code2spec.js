const fs = require('fs/promises');
const path = require('path');
const scanDirectory = require('../../util/scanDirectory');
const getSrcDirPath = require('../../core/getSrcDirPath');
const getSpecDirPath = require('../../core/getSpecDirPath');
const updateSpecSrcFilePair = require('../../ai/seq/updateSpecSrcFilePair');

module.exports = {
	command: 'code2spec',
	desc: 'Generate or update spec files based on the source code files',
	run: async function code2spec(argv, context) {

		// Updating the spec files
		console.log("🐣 [ai]: Updating the spec files ...");

		// Get the list of source files
		const srcFiles = await scanDirectory(
			getSrcDirPath(), 
			{ 
				exclude: config.config?.src_exclude, 
				include: config.config?.src_include 
			}
		);
	
		// Async promise array
		const promiseArr = [];

		// Lets update the spec files in parallel
		for (const srcFile of srcFiles) {
			console.log(`🐣 [ai]: (async) Updating spec file - ${specFile}`)
			promiseArr.push(
				updateSpecSrcFilePair("src", srcFile)
			);
		}

		// Wait for all the promises to resolve
		await Promise.all(promiseArr);
		console.log(`🐣 [ai]: Finished current set of async spec file update`)
	
		// Finish operations
		// ---
		// Due to a bug with mongodb hanging connections, 
		// we need to exit the process, when the process is done
		process.exit(0);
	},
};