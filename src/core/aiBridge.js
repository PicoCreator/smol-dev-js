// Dependencies
// ---
const config = require("./config");
const AiBridge = require("ai-bridge");

// Load the AI module
// ---
try {
	const ai = new AiBridge(config.aibridge);
	// Export the module
	module.exports = ai;
} catch(e) {
	// This allow --setup to be done first
	module.exports = {};
}