// Dependencies
// ---
const config = require("./config");
const AiBridge = require("ai-bridge");

// Load the AI module
// ---
const ai = new AiBridge(config.aibridge);

// Export the module
module.exports = ai;