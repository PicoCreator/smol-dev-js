// Core deps
const fs = require("fs")
const ai = require("../../core/ai");
const simplePrompt = require("../../cli/simplePrompt");
const getSpecDirPath = require("../../core/getSpecDirPath");
const getSrcDirPath = require("../../core/getSrcDirPath");

// Prompt builder deps
const getPromptBlock = require("../../prompt/builder/getPromptBlock");
const getMainDevSystemPrompt = require("../../prompt/part/getMainDevSystemPrompt");
const jsonObjectChatCompletion = require("../call/jsonObjectChatCompletion");

/**
 * Given the current plan, and the operation map, execute it
 */
module.exports = async function getOperationFileMapFromPlan(currentPlan, operationMap) {
 
	// // Example of operationMap
	// {
	// 	'0_NPM_DEP_INSTALL': [],
	// 	'1_MOVE_SRC': {},
	// 	'1_MOVE_SPEC': {},
	// 	'2_DEL_SRC': [],
	// 	'2_DEL_SPEC': [],
	// 	'3_UPDATE_SRC': [ 'mainCLI.js', 'cli/command/code2spec.js' ],
	// 	'3_UPDATE_SPEC': [ 'README.md' ],
	// 	'4_UPDATE_SRC': [],
	// 	'4_UPDATE_SPEC': [],
	// 	LOCAL_DEP: [ 'util/scanDirectory.js', 'core/ai.js' ]
	// }

	// Lets handle the NPM installs
	let npmInstallArr = operationMap["0_NPM_DEP_INSTALL"];
	if (npmInstallArr && npmInstallArr.length > 0) {
		// Prompt injection safety, confirm with user first
		console.log(`Confirm the excution of 'npm install ${npmInstallArr.join(" ")}'`)
		simplePrompt({
			type: "confirm",
			name: "approve",
			message: "[you]: Install listed dependencies?",
			initial: true
		})

		// Execute the npm install commands
		await ai.exec(`npm install ${npmInstallArr.join(" ")}`);	
	}

	// Lets get the src and spec dir paths
	let specDir = getSpecDirPath();
	let srcDir = getSrcDirPath();

	// Lets handle the file moves of the src dir
	let moveSrcMap = operationMap["1_MOVE_SRC"];
	if(moveSrcMap) {
		for (let oldPath in moveSrcMap) {
			let fullOldPath = path.resolve(srcDir, oldPath)
			let fullNewPath = path.resolve(srcDir, moveSrcMap[oldPath]);

			// Operation safety!!! - Check if the old and new path ARE within the src dir
			if (!fullOldPath.startsWith(srcDir)) {
				throw new Error(`The old path '${fullOldPath}' is not within the src dir '${srcDir}'`)
			}
			if (!fullNewPath.startsWith(srcDir)) {
				throw new Error(`The new path '${fullNewPath}' is not within the src dir '${srcDir}'`)
			}

			// Move it
			await fs.promises.rename( fullOldPath, fullNewPath );
		}
	}

	// Lets handle the file moves of the spec dir
	let moveSpecMap = operationMap["1_MOVE_SPEC"];
	if(moveSpecMap) {
		for (let oldPath in moveSpecMap) {
			let fullOldPath = path.resolve(specDir, oldPath)
			let fullNewPath = path.resolve(specDir, moveSpecMap[oldPath]);

			// Operation safety!!! - Check if the old and new path ARE within the spec dir
			if (!fullOldPath.startsWith(specDir)) {
				throw new Error(`The old path '${fullOldPath}' is not within the spec dir '${specDir}'`)
			}
			if (!fullNewPath.startsWith(specDir)) {
				throw new Error(`The new path '${fullNewPath}' is not within the spec dir '${specDir}'`)
			}

			// Move it
			await fs.promises.rename( fullOldPath, fullNewPath );
		}
	}

	// Lets handle the file deletes of the src dir
	let delSrcArr = operationMap["2_DEL_SRC"];
	if(delSrcArr && delSrcArr.length > 0) {
		for (let path of delSrcArr) {
			let fullPath = path.resolve(srcDir, path)

			// Operation safety!!! - Check if the path IS within the src dir
			if (!fullPath.startsWith(srcDir)) {
				throw new Error(`The path '${fullPath}' is not within the src dir '${srcDir}'`)
			}

			// Delete it
			await fs.promises.unlink( fullPath );
		}
	}

	// Lets handle the file deletes of the spec dir
	let delSpecArr = operationMap["2_DEL_SPEC"];
	if(delSpecArr && delSpecArr.length > 0) {
		for (let path of delSpecArr) {
			let fullPath = path.resolve(specDir, path)

			// Operation safety!!! - Check if the path IS within the spec dir
			if (!fullPath.startsWith(specDir)) {
				throw new Error(`The path '${fullPath}' is not within the spec dir '${specDir}'`)
			}

			// Delete it
			await fs.promises.unlink( fullPath );
		}
	}

	// Lets handle the file updates of the src dir
	let updateSrcArr = operationMap["3_UPDATE_SRC"];
	if(updateSrcArr && updateSrcArr.length > 0) {
		for(const srcFile of updateSrcArr) {
			// @TODO
		}
	}

	// Lets handle the file updates of the spec dir
	let updateSpecArr = operationMap["3_UPDATE_SPEC"];
	if(updateSpecArr && updateSpecArr.length > 0) {
		for(const specFile of updateSpecArr) {
			// @TODO
		}
	}

	// Lets handle the file updates of the src dir
	let updateSrcArr_rd2 = operationMap["4_UPDATE_SRC"];
	if(updateSrcArr_rd2 && updateSrcArr_rd2.length > 0) {
		for(const srcFile of updateSrcArr_rd2) {
			// @TODO
		}
	}

	// Lets handle the file updates of the spec dir
	let updateSpecArr_rd2 = operationMap["4_UPDATE_SPEC"];
	if(updateSpecArr_rd2 && updateSpecArr_rd2.length > 0) {
		for(const specFile of updateSpecArr_rd2) {
			// @TODO
		}
	}

}