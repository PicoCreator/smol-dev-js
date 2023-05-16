// The charset to iterate with
const midSegmentCharset = "~-=+!@#$%&*:|".split('');

/**
 * Given the input string, derive a sutible 'block' wrapper line to use.
 * This is unique, and not used - as a seperator.
 * 
 * @param {String} data
 */
module.exports = function getBlockWrapLine(data) {
	// Trim the data provided
	data = data.trim();

	// Use markdown if possible
	if( data.indexOf("```") < 0 ) {
		return '```'
	}

	// Ok markdown failed, lets find the more complicated version
	for( const midChar of midSegmentCharset ) {
		// Lets build the line break
		let codeLineBreak = "<<" + "{{" + midChar+midChar + "}}" + ">>";
		// And check that it does not exists
		if( data.indexOf(codeLineBreak) < 0 ) {
			return codeLineBreak
		}
	}
	
	// All search has failed, ABORT !
	throw "Unable to find valid 'block wrap line', exhausted all options";
}