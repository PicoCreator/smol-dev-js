const fs = require("fs")
const path = require("path")
const ConfigLoader = require("@js-util/config-loader")

//
// Load the various config files (if found),
// along with the various default value fallbacks
//
const cwd = process.cwd();
const configDir = path.join(cwd, ".smol-dev-js/config/");

// Check if it exists
let configDirExists = false;
if( fs.existsSync(configDir) ) {
	configDirExists = true;
}

const config = new ConfigLoader({
	configDirList: (configDirExists? [ path.join(cwd, ".smol-dev-js/config/") ] : [] ),
	fileList: [],
	default: {
		// Main ai-dev config
		// ---
		config: {

		},

		// The following config settings is for the ai-bridge module
		// ---
		aibridge: {

			// openAI key
			provider: {
				// openai: "<CHANGE TO YOUR OPENAI KEY>"
			},
			
			// // Number of provider requests that can occur concurrently
			// providerRateLimit: 1,
			
			// Latency delay between request, to be used with rate limit, to further "tune down"
			providerLatencyAdd: 0,
			
			// Caching controls
			//--------------------
			"cache": {
				// Local dir, to store multiple jsonl files, which is used for caching
				"localJsonlDir": {
					"enable": true,
					"path": "./.smol-dev-js/ai-cache"
				},
				
				// MongoDB connection, to store and query cached completion request
				"mongoDB": {
					"enable": false,
					"url": "<CHANGE TO YOUR RESPECTIVE MONGODB URL>",
				},
				
				// Individually enable prompt or embedding caching
				"promptCache": true,
				"embeddingCache": true
			}
		}
	}
});

// Export the config
module.exports = config;