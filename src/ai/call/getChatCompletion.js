// Dependencies
const aiBridge = require("../../core/aiBridge");
const config = require("../../core/config");

/**
 * Get the completion of a chat (this is based on aiBridge and is a wrapper for it)
 * 
 * @param {Array<Object>} messages array, containing object with role/content to use
 * @param {Object} promptOpts prompt options to use, merged with default
 * @param {Function} streamListener, for handling streaming requests
 * 
 * @param {String} cacheGrp to cache under, used for grouping cache requests
 * @param {Number} tempKey to use, automatically generated if -1
 */
module.exports = async function getChatCompletion(messages, promptOpts = {}, streamListener = null, cacheGrp = "default", tempKey = -1) {
	// Get the model class
	let model = promptOpts.model;

	// And decide what we should use
	if( config.config?.provider == "anthropic" ) {
		model = "claude-v1-100k"
	} else {
		if( model == "gpt-4" || model == "smart" ) {
			if( config.gpt4_32k ) {
				model = "gpt-4-32k";
			} else {
				model = "gpt-4";
			}
		} else if( model == "economical" ) {
			model = "gpt-4e"
		}	
	}

	// Override the config
	promptOpts.model = model;

	// And execute
	return await aiBridge.getChatCompletion(messages, promptOpts, streamListener, cacheGrp, tempKey);
}