// Dependencies
// ---
const config = require("./config");
const AiBridge = require("ai-bridge");

// Load the AI module
// ---
if( config.config?.provider ) {
	const ai = new AiBridge(config.aibridge);
	// Export the module
	module.exports = ai;
} else {
	// This allow --setup to be done first
	module.exports = {};
}