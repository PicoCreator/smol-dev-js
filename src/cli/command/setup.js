
//--------------
//
//  Dependencies
//
//--------------

const fs = require("fs")
const prompts = require('prompts');
const config = require("../../core/config");
const readFileOrNull = require("../../util/readFileOrNull");
const OutputHandler = require("../OutputHandler");
const simplePrompt = require("../simplePrompt");

//--------------
//
//  Command Definition
//
//--------------

module.exports = {
	
	desc: "Given the specification file path, suggest changes to be made",
	
	setup: (cmd) => {
		// No additional argument required
	},
	
	// Execute the run command
	run: async (argv, context) => {

		// The valeus we want to udpate
		let aibridgeConfig = Object.assign({}, config.aibridge);
		let configValues = Object.assign({}, config.config);

		// --------------
		//
		// Lets handle API keys choices
		// - anthropic API key
		// - openAI API key
		//
		// --------------

		// Reused var declar
		let promptConfig = null;

		// Lets ask which provider they want to use
		promptConfig = await simplePrompt([
			{
				type: 'select',
				name: 'provider',
				message: 'Which provider do you want to use?',
				choices: [
					{ title: 'OpenAI', value: 'openai' },
					{ title: 'Anthropic (preferred)', value: 'anthropic' },
				],
				initial: 0
			}
		]);

		// Lets update the config for the selection
		let provider = promptConfig.provider;
		configValues.provider = provider;

		// Lets ask for the API key
		if( provider == "anthropic" ) {
			promptConfig = await simplePrompt([
				{
					type: 'password',
					name: 'anthropic_key',
					message: 'Anthropic API Key (leave blank to use existing, if any)',
				}
			]);

			// Lets update the apikey value
			if( promptConfig.anthropic_key && promptConfig.anthropic_key.length > 0) {
				aibridgeConfig.provider.anthropic = promptConfig.anthropic_key;
			}
			if( aibridgeConfig.provider.anthropic.length == 0 ) {
				OutputHandler.standardRed("[sys] No API key provided, please update the config manually later")
			}
		} else if( provider == "openai" ) {
			promptConfig = await simplePrompt([
				{
					type: 'password',
					name: 'openai_key',
					message: 'OpenAI API Key (leave blank to use existing, if any)',
				}
			]);

			// Lets update the apikey value
			if( promptConfig.openai_key && promptConfig.openai_key.length > 0 ) {
				aibridgeConfig.provider.openai = promptConfig.openai_key;
			}
			if( aibridgeConfig.provider.openai.length == 0 ) {
				OutputHandler.standardRed("[sys] No API key provided, please update the config manually later")
			}
		}

		// Lets ask for the preferred concurrent rate limit
		promptConfig = await simplePrompt([
			{
				type: 'number',
				name: 'concurrent_rate_limit',
				message: 'Max AI workers (recommended 1 for anthropic trial, 2 for openai)',
				initial: config.aibridge.providerRateLimit || 1
			}
		]);
		// Lets update the rate limit
		aibridgeConfig.providerRateLimit = promptConfig.concurrent_rate_limit;

		// --------------
		// Check if there is package.json in the CWD
		// if it exists lets read it for default values
		// else default to null
		// --------------
		let packageJson = null;
		try {
			packageJson = require(process.cwd()+"/package.json");
		} catch(err) {
			// Ignore error
		}

		// Log that the package.json was found
		if(packageJson) {
			OutputHandler.standard("[sys] Found package.json, using it for default values");
		} else {
			OutputHandler.standardRed("[sys] Missing package.json, while this is not required, `smol-dev-js` is optimized only for nodejs projects")
		}

		// Lets extract the existing description
		let initDescript = null;
		if( config.config?.short_description ) {
			initDescript = config.config.short_description;
		} else if( packageJson?.description ) {
			initDescript = packageJson.description;
		}

		// Lets ask the user for the following key values
		// - description of the project
		// - spec_dir (if enabled)

		// Ask for the openAI API key
		promptConfig = await prompts([
			{
				type: 'text',
				name: 'short_description',
				message: 'Short Description of the project',
				initial: initDescript
			},
			{
				type: 'text',
				name: 'spec_dir',
				message: 'Does this project have a markdown specification directory? Leave blank if disabled (highly recommended)',
				initial: (config.config?.spec_dir === null)? "spec" : config.config?.spec_dir,
			},
			{
				type: 'text',
				name: 'src_dir',
				message: 'Where would be the src code dir be (which the AI can modify)? Leave blank to use the entire project directory',
				initial: (config.config?.src_dir === null)? "src" : config.config?.src_dir,
			}
		], {
			onCancel: () => {
				OutputHandler.standard("[sys] Exit command recieved, exiting...");
				process.exit(1);
			}
		});
		
		// Lets get the updated config values
		aibridgeConfig.provider.openai = promptConfig.openai_key || aibridgeConfig.provider.openai;

		// Lets get the updated config values
		configValues.short_description = promptConfig.short_description || configValues.short_description;
		configValues.spec_dir = promptConfig.spec_dir || configValues.spec_dir;
		configValues.src_dir = promptConfig.src_dir || configValues.src_dir;

		// Lets setup the src include / exclude
		configValues.src_include = configValues.src_include || ["**"];
		configValues.src_exclude = configValues.src_exclude || ["**/.*", "**/*.bin", "**/node_modules/**", "**/build/**", "**/bin/**"]

		// Setup the config directory
		await fs.promises.mkdir(process.cwd()+"/.smol-dev-js/config", { recursive: true });

		// Lets write the config file
		await fs.promises.writeFile(process.cwd()+"/.smol-dev-js/config/aibridge.json", JSON.stringify( aibridgeConfig, null, "	" ));
		await fs.promises.writeFile(process.cwd()+"/.smol-dev-js/config/config.json", JSON.stringify( configValues, null, "	" ));

		// Check that its removed from .gitignore and .npmignore
		let gitIgnore = await readFileOrNull(process.cwd()+"/.gitignore", "");
		let npmIgnore = await readFileOrNull(process.cwd()+"/.npmignore", "");

		// Check if .smol-dev-js is present
		if( gitIgnore.indexOf(".smol-dev-js") === -1 ) {
			OutputHandler.standard("[sys] Adding .smol-dev-js to .gitignore");
			await fs.promises.appendFile(process.cwd()+"/.gitignore", "\n.smol-dev-js");
		}
		if( npmIgnore.indexOf(".smol-dev-js") === -1 ) {
			OutputHandler.standard("[sys] Adding .smol-dev-js to .npmignore");
			await fs.promises.appendFile(process.cwd()+"/.npmignore", "\n.smol-dev-js");
		}

		// Due to a bug with mongodb hanging connections, 
		// we need to exit the process, when the process is done
		process.exit(0);
	}
}