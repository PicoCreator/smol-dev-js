// Dependencies
const aiBridge = require("../../core/aiBridge");

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
    if( model == "gpt-4" || model == "smart" ) {
        model = "gpt-4";
    } else if( model == "economical" ) {
        model = "gpt-4e"
    }

    return await aiBridge.getChatCompletion(messages, promptOpts, streamListener, cacheGrp, tempKey);
}