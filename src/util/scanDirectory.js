const path = require('path');
const glob = require('glob').glob;

/**
 * Utility function, used to convert nested file object to string format
 * @param {Object} nestedFileObj 
 * @param {String} prefixTab 
 * @returns 
 */
function nestedFileObjToStrFormat(nestedFileObj, prefixTab="") {
	let result = "";
	for(const key in nestedFileObj) {
		const value = nestedFileObj[key];	

		if(typeof value == "object") {
			result += `${prefixTab}${key}/\n`;
			result += nestedFileObjToStrFormat(value, prefixTab+"	");
		} else {
			result += `${prefixTab}${key}\n`;
		}
	}
	return result;
}

/**
 * Given the directory, and the option object with the following options
 * 
 * - include: glob pattern to include
 * - exclude: glob pattern to exclude
 * 
 * - absolutePath: boolean flag, return absolute path
 * - nestedObject: boolean flag, return nested object format instead of flat array
 * - treeString: boolean flag, return tree string format instead of flat array
 * 
 * Scan and return the relevant files and directories
 * 
 * @param {String} dir 
 * @param {Object} options 
 * 
 * @returns {Array<String>|Object} list of file path in the specified directory
 */
module.exports = async function scanDirectory(dir, options) {

	// Lets resolve the dir path, and normalize option object
	dir = path.resolve(dir);
	options = options || {};

	// Scan using glob
	let globResult = await glob(
		(options.include || ["**"]), 
		{
			cwd: dir,
			mark: true,
			ignore: options.exclude || [".*", "**/node_modules/**", "**/build/**", "**/bin/**"],
			absolute: options.absolutePath || false,
			posix: true
		}
	);
	
	// Filter out the search dir itself
	globResult = globResult.slice(1);

	// And sort it alphabetically
	globResult.sort();

	// If nestedObject flag is set, return the nested object
	if(options.nestedObject || options.treeString) {
		let nestedObject = {};
		for(const relativePath of globResult) {
			let splitPathArr = relativePath.split("/");
			let currentObject = nestedObject;
			for(let i=0; i<(splitPathArr.length - 1); ++i) {
				const subPath = splitPathArr[i];
				currentObject[subPath] = currentObject[subPath] || {};
				currentObject = currentObject[subPath];
			}

			// If last item is not blank, then its a file
			if(splitPathArr[splitPathArr.length - 1] != "") {
				currentObject[splitPathArr[splitPathArr.length - 1]] = true;
			}
		}

		// If treeString flag is set, return the tree string
		if(options.treeString) {
			return nestedFileObjToStrFormat(nestedObject).trim();
		}

		// Otherwise, just return the nested object
		return nestedObject;
	}


	// And return it
	return globResult;
}