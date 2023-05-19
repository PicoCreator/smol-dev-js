const getBlockWrapLine = require("./getBlockWrapLine");

/**
 * Wrap the prompt data within a block delimiter,
 * adapted according to the input data, to avoid accidental "block escape"
 * 
 * @param {String} label, to describe the block
 * @param {String} data, to wrap
 * @param {String} wrapLine to use, autodetected if null
 */
 function getPromptBlock(label, data, wrapLine = null) {
	// Trim the data provided
	data = data.trim();

	// Get the wrap line
	if( wrapLine == null ) {
		// Claude performs poorly with custom block brackets
		// so we shall disable this behavioru for now
		// ---
		// wrapLine = getBlockWrapLine(data);

		// Use ``` as default
		wrapLine = '```'
	}

	// Simple markdown
	if( wrapLine == '```' ) {
		// Wrap it using markdown code block
		return [
			`${label} :`,
			"```",
			data,
			"```"
		].join("\n")
	}

	// Special wrapping
	return [
		`${label} (between 2 \`${wrapLine}\` lines) :`,
		wrapLine,
		data,
		wrapLine
	].join("\n");
}
module.exports = getPromptBlock;