/**
 * Given two string parameters 
 * - inData : containing the code, which needs to be minified 
 * - inType : the programming language category either "cstyle" or "xml"
 * 
 * Attempt to safely minify the given data code, while stripping comments in a safe way.
 * The goal isn't to get the perfect minified code (which we will use another tool), but to safely remove whitespace and comments when possible. And reduce the overall character count.
 * 
 * @param {string} inData - The code to minify
 * @param {string} inType - The programming language category either "cstyle" or "xml"
 * 
 * @returns {string} The minified code
 */
 module.exports = function simpleAndSafeMinify(inData, inType = "cstyle") {
	let outData = '';
	if (inType === 'xml') {
	  outData = xml_minify(inData);
	} else if (inType === 'cstyle') {
	  outData = cstyle_minify(inData);
	}
	return outData.trim();
};

/**
 * Handle minification of XML code
 * 
 * @param {string} inData - The code to minify
 * 
 * @returns {string} The minified code
 */
function xml_minify(inData) {
	// Find and remove <!-- comment --> blocks
	const commentRegex = /<!--[\s\S]*?-->/g;
	let outData = inData.replace(commentRegex, '');
  
	// Find and remove whitespaces between blocks (check for ">" and "<")
	const whitespaceRegex = />\s+</g;
	outData = outData.replace(whitespaceRegex, '><');
  
	// Trim the final string
	return outData.split("\n").map((val)=>{return val.trim()}).join("\n").trim();
};

/**
 * Perform the reduction of whitespaces safely,
 * We can assume there is no "strings" or "comments" in the data
 * @param {string} inData 
 * @returns {string} The minified code
 */
function cstyle_simpleCodeReduction(inData) {
	// Quick skip for blank
	if( inData == "" || inData == null ) {
		return inData;
	}

	// Replace all tabs and spaces with a single space
	let outData = inData.replace( /[ \t]+/g , ' ');

	// Safely handle assignment spacings
	outData = outData.replace( /[\s]*=/g , '=');
	outData = outData.replace( /=[\s]*/g , '=');

	// Safely handle end of statements
	outData = outData.replace( /\;\s*/g , ';');

	// Trim the final string
	outData = outData.split("\n").map((val)=>{return val.trim()}).join("\n").trim();

	// Remove duplicate newlines
	outData = outData.replace( /\n[\n]*/g , '\n');
	
	// Return the final string
	return outData;
}

/**
 * Handle minification of cstyle code
 * 
 * @param {string} inData - The code to minify
 * 
 * @returns {string} The minified code
 */
function cstyle_minify(inData) {

	// Find the first instance of a string block which can be wrapped with either ` or ' or " quotes.
	// or a code comment line or comment block (which is not in a string block)
	const openRegex = /('|"|`|\/\/|\/\*)/;

	// Find the first match
	const openMatch = inData.match(openRegex);

	// if no match, just return with simple code reduction
	if (!openMatch) {
		return cstyle_simpleCodeReduction(inData);
	}

	// Get the string before openMatch, and do simple code reduction
	const beforeMatch = inData.slice(0, openMatch.index);
	const beforeMatchReduced = cstyle_simpleCodeReduction(beforeMatch);

	// Get the matched str itself
	const matchedStr = openMatch[0];

	// Get the string after the openMatch, excluding the matched string itself
	const afterMatch = inData.slice(openMatch.index + matchedStr.length);

	// if match is a comment block
	if (matchedStr === '/*') {

		// Find the end of the comment block
		const closeRegex = /\*\//;
		const closeMatch = afterMatch.match(closeRegex);

		// if no end of comment block found, return just the beforeMatchReduced
		// as the rest of the code is "commented out"
		if (!closeMatch) {
			return beforeMatchReduced;
		}

		// Get the string after the closeMatch, excluding the matched string itself
		const afterCloseMatch = afterMatch.slice(closeMatch.index + 2);

		// Recursively minify the after match, and return it with the beforeMatchReduced
		return cstyle_simpleCodeReduction(
			beforeMatchReduced + " " + cstyle_minify(afterCloseMatch)
		);
	}

	// If it matches a comment line, find the end of the line
	if (matchedStr === '//') {
		// Find the end of the comment line
		const closeRegex = /\n/;
		const closeMatch = afterMatch.match(closeRegex);

		// if no end of comment line found, return just the beforeMatchReduced
		// as the rest of the code is "commented out"
		if (!closeMatch) {
			return beforeMatchReduced;
		}

		// Get the string after the closeMatch, excluding the matched string itself
		const afterCloseMatch = afterMatch.slice(closeMatch.index + 1);

		// Recursively minify the after match, and return it with the beforeMatchReduced
		return cstyle_simpleCodeReduction(
			beforeMatchReduced + "\n" + cstyle_minify(afterCloseMatch)
		);
	}

	// It matches a string block, check if its an immediate close (no content)
	// by checking if the next character is the same as the matchedStr
	if (afterMatch[0] === matchedStr) {
		// Recursively minify the after match, and return it with the beforeMatchReduced
		return beforeMatchReduced + matchedStr + matchedStr + cstyle_minify(afterMatch.slice(1))
	}

	// Prepare the closeRegex for each type of string block
	// that is "escape safe" (ie. is NOT escaped by a backslash)
	let closeRegex;
	if (matchedStr === "'") {
		closeRegex = /[^\\]'/;
	} else if (matchedStr === '"') {
		closeRegex = /[^\\]"/;
	} else if (matchedStr === '`') {
		closeRegex = /[^\\]`/;
	}

	// Find the end of the string block
	const closeMatch = afterMatch.match(closeRegex);
	
	// if no end of string block found, return just the beforeMatchReduced
	// with the rest of the string itself
	if (!closeMatch) {
		return beforeMatchReduced + matchedStr + afterMatch;
	}

	// Match found, get the string after the closeMatch, excluding the matched string itself
	// note the additional "not an escaped backslash" character
	const afterCloseMatch = afterMatch.slice(closeMatch.index + 2);

	// and recursively minify it
	const afterCloseMatchMinify = cstyle_minify(afterCloseMatch);

	// Return the minified before and after matches, with the matched string block unchanged
	return beforeMatchReduced + matchedStr + afterMatch.slice(0, closeMatch.index + 2) + afterCloseMatchMinify;
};
