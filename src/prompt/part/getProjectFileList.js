const path = require("path")
const config = require('../../core/config');
const scanDirectory = require('../../fs/scanDirectory');
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
	if( specDir == "" ) specDir = null;
	if( srcDir == "" ) srcDir = "./";

	// Get the full path for spec and src dir
	const specDirPath = specDir ? path.resolve(cwd,specDir) : null;
	const srcDirPath = path.resolve(cwd,srcDir);

	// If the spec dir is configured, lets scan it
	let specFilesPrompt = null;
	if( specDirPath ) {
		specFilesPrompt = await scanDirectory(
			specDirPath,
			{ 
				includes: ["**/*.md"],
				treeString:true
			}
		);
	}

	// Get the src files inclusion and exclusion
	let srcFilesIncludes = config.config.src_include || ["**"];
	let srcFilesExcludes = config.config.src_exclude || [".*", "**/node_modules/**", "**/build/**", "**/bin/**"];

	// If spec dir is configured, we need to exclude it via relative pathing
	if( specDirPath ) {
		// Check if spec dir is a subdirectory of src dir
		if( specDirPath.startsWith(srcDirPath) ) {
			// Get the relative pathing
			let relativePath = path.relative(srcDirPath, specDirPath);

			// If the relative path is not blank, then add it to the exclude list
			if( relativePath != "" ) {
				srcFilesExcludes = srcFilesExcludes.slice().push(relativePath);
			}
		}
	}

	// Scan and get the list of src files
	let srcFilesPrompt = await scanDirectory(
		srcDirPath, 
		{ 
			includes: srcFilesIncludes,
			excludes: srcFilesExcludes,
			treeString:true 
		}
	);


	// Lets build the final return string
	let returnString = "";

	// If spec dir is configured, add it to the return string
	if( specFilesPrompt ) {
		returnString += getPromptBlock("The following, lists specification files, in the `specs` folder", specFilesPrompt);
		returnString += "\n\n";
	}

	// List the src files
	returnString += getPromptBlock("The following, lists source code files, in the `src` folder", srcFilesPrompt);

	// Return the built prompt string
	return returnString;
}