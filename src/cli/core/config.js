const path = require("path")
const ConfigLoader = require("@js-util/config-loader")

//
// Load the various config files (if found),
// along with the various default value fallbacks
//
const cwd = process.cwd();
const config = new ConfigLoader({
	configDirList:[
		path.join(cwd, ".my-ai-dev/config/"),
	],
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
				openai: "<CHANGE TO YOUR OPENAI KEY>"
			},
			
			// Number of provider requests that can occur concurrently
			providerRateLimit: 10,
			
			// Latency delay between request, to be used with rate limit, to further "tune down"
			providerLatencyAdd: 0,
			
			// Caching controls
			//--------------------
			"cache": {
				// Local dir, to store multiple jsonl files, which is used for caching
				"localJsonlDir": {
					"enable": true,
					"path": "./.my-ai-dev/ai-cache"
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