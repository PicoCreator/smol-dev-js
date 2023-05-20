const getChatCompletion = require("./getChatCompletion");
const extractJsonObject = require("../../prompt/filter/extractJsonObject");
const computeTokenCost = require("../../util/computeTokenCost");

/**
 * Varient of getChatCompletion, but with special handling in ensuring a JSON object response
 * It however breaks streaming compatibility, as it has special handling for "retries".
 * 
 * Note that the messages should include instructions on the expected JSON format.
 * This function will only handle the "reminder/retry" on invalid format
 * 
 * @param {Array|String} messages in the chat request format
 * @param {Object} opt additional opt for the AI, forwarded to the completion options
 * 		- retCompletionStrInsteadOfError: if true, will return the completion string instead of throwing an error
 * @param {Function} validator, for validating the JSON response, should return true if valid
 * @param {Function} streamListener, for handling streaming requests
 * 
 * @return {Object} containing the `result` with the JSON array response, and the `token` cost obj
 */
module.exports = async function jsonObjectCompletion(messages, opt = {}, validator = null, streamListener = null) {
	// Safety
	if( validator == null ) {
		validator = () => { return true; };
	}
	if( streamListener == null ) {
		streamListener = () => {};
	}

	// Extract the json specific options
	let retCompletionStrOnError = opt.retCompletionStrOnError || false;
	delete opt.retCompletionStrOnError;

	// Normalize messages to the chat format if its a string
	if( typeof messages == "string" ) {
		messages = [ { "role": "user", "content": messages } ];
	}
	// Check if messages is an array
	if( !Array.isArray(messages) ) {
		throw new Error(`Invalid messages format, should be an array or string`);
	}

	// Lets add the system induction prompt to the beginning
	messages = [
		{ role:"system", content:"You are an assistant, who can only reply in JSON object, reply with a yes (in a param named 'reply') if you understand" },
		{ role:"assistant", content:"{\"reply\":\"yes\"}"}
	].concat(messages);

	// Cost tracking
	let costTracker = [];

	// The JSON array output
	let jsonObj = null;

	// Get the chat completion
	let rd1completion = null;
	let lastCompletion = null;

	// Lets do the first try
	try {
		// Get the chat completion
		const rd1Res = await getChatCompletion(messages, opt);
		costTracker.push( rd1Res );

		// Extract the JSON array
		rd1completion = rd1Res.completion;
		lastCompletion = rd1Res.completion;
		jsonObj = extractJsonObject( rd1Res.completion );

		// Validate the JSON array
		if( validator(jsonObj) !== true) {
			throw new Error(`Invalid JSON object response (validator !== true)`);
		}
	} catch(e) {
		// ROUND 2 : Lets add a reminder
		let rnd2Msgs = messages.slice();
		if( rd1completion ) {
			rnd2Msgs.push({
				"role": "assistant",
				"content": rd1completion
			});
		}
		// rnd2Msgs.push({
		// 	"role": "system",
		// 	"content": "You are an ai assistant, who replies only with JSON object"
		// });
		rnd2Msgs.push({
			"role": "user",
			"content": "Please update your answer, and respond with only a single JSON object, in the requested format. No apology is needed."
		});

		// And get the completion
		try {
			const rd2Res = await getChatCompletion(rnd2Msgs, opt);
			costTracker.push( rd2Res );
	
			// // Debugging
			// console.log(rd2Res.completion)
	
			// Extract the JSON array
			lastCompletion = rd2Res.completion || lastCompletion;
			jsonObj = extractJsonObject( rd2Res.completion );
	
			// Validate the JSON array
			if( (await validator(jsonObj)) !== true) {
				throw new Error(`Invalid JSON object response (validator !== true)`);
			}
		} catch(e) {
			if( retCompletionStrOnError ) {
				return {
					result: lastCompletion,
					token: computeTokenCost(costTracker)
				};
			}
			console.error(e);
			console.error("Last Completion", lastCompletion)
			throw e;
		}
	}

	// Return the completion result
	streamListener( JSON.stringify(jsonObj) )
	return {
		result: jsonObj,
		token: computeTokenCost(costTracker)
	};
}