const ai = require("../../core/aiBridge");
const path = require("path")
const config = require('../../core/config');
const scanDirectory = require('../../util/scanDirectory');
const getPromptBlock = require("../builder/getPromptBlock");

/**
 * Get the project file list as a giant usable prompt string
 */
module.exports = async function getProjectFileList(includeSrcFiles = true, includeSpecFiles = true) {
	// Get the CWD
	let cwd = process.cwd();

	// Get the spec / src dir if configured
	let specDir = config.config.spec_dir || null;
	let srcDir = config.config.src_dir || null;

	// Lets normalize blank spec dir as null
	// While blank src directory to local
	if( specDir == "" || specDir == null ) specDir = null;
	if( srcDir == "" || srcDir == null ) srcDir = "./";

	// Get the full path for spec and src dir
	const specDirPath = specDir ? path.resolve(cwd,specDir) : null;
	const srcDirPath = path.resolve(cwd,srcDir);

	// If the spec dir is configured, lets scan it
	let specFilesPrompt = null;
	if( specDirPath ) {
		specFilesPrompt = await scanDirectory(
			specDirPath,
			{ 
				include: ["**/*.md"],
				treeString:true
			}
		);
	}

	// Get the src files inclusion and exclusion
	let srcFilesIncludes = config.config.src_include || ["**"];
	let srcFilesExcludes = config.config.src_exclude || [".*", "**/node_modules/**", "**/build/**", "**/bin/**", "**/.*"];

	// If spec dir is configured, we need to exclude it via relative pathing
	if( specDirPath ) {
		// Check if spec dir is a subdirectory of src dir
		if( specDirPath.startsWith(srcDirPath) ) {
			// Get the relative pathing
			let relativePath = specDirPath.replace(srcDirPath, "").trim();
			if(relativePath.startsWith("/")) {
				relativePath = relativePath.slice(1);
			}

			// If the relative path is not blank, then add it to the exclude list
			if( relativePath && relativePath != "" ) {
				srcFilesExcludes = srcFilesExcludes.slice();
				srcFilesExcludes.push(relativePath+"/**");
			}
		}
	}

	// Scan and get the list of src files
	let srcFilesPrompt = await scanDirectory(
		srcDirPath, 
		{ 
			include: srcFilesIncludes,
			exclude: srcFilesExcludes,
			treeString:true 
		}
	);


	// Lets build the final return string
	let returnString = "";

	// If spec dir is configured, add it to the return string
	if( specFilesPrompt ) {
		returnString += getPromptBlock("specification file list, in the `specs` folder", specFilesPrompt);
		returnString += "\n\n";
	}

	// List the src files
	returnString += getPromptBlock("source code file list, in the `src` folder", srcFilesPrompt);

	// Get the token count, and check against limits
	let tokenCount = await ai.getTokenCount(returnString);
	let tokenLimit = config.config.limits?.FILE_LIST || 1000;
	if( tokenCount > tokenLimit ) {
		throw `File list exceeds token limit of ${tokenLimit} - make changes to the '.smol-dev-js/config.json' src_include / src_exclude to reduce the file list`;
	}

	// Return the built prompt string
	return returnString;
}