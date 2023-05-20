const ai = require("../../core/ai");
const extractJsonArray = require("../../prompt/uilder/filter/extractJsonArray");
const computeTokenCost = require("../../util/computeTokenCost");
const getChatCompletion = require("./getChatCompletion");

/**
 * Varient of getChatCompletion, but with special handling in ensuring a JSON array response
 * It however breaks streaming compatibility, as it has special handling for "retries".
 * 
 * Note that the messages should include instructions on the expected JSON format.
 * This function will only handle the "reminder/retry" on invalid format
 * 
 * @param {Array|String} messages in the chat request format
 * @param {Object} opt additional opt for the AI, forwarded to the completion options
 * 		- retCompletionStrInsteadOfError: if true, will return the completion string instead of throwing an error
 * @param {Function|int} validator, for validating the JSON array response, should return true if valid, if an int is given, it just checks array length
 * @param {Function} streamListener, for handling streaming requests
 * 
 * @return {Object} containing the `result` with the JSON array response, and the `token` cost obj
 */
module.exports = async function jsonArrayCompletion(messages, opt = {}, validator = null, streamListener = null) {
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

	// Configure the validator if its a number
	if( typeof validator == "number" ) {
		const expectedLength = validator;
		validator = (jsonArr) => {
			return jsonArr.length == expectedLength;
		}
	}

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
		{ role:"system", content:"You are an assistant, who can only reply in JSON arrays, reply with a yes if you understand" },
		{ role:"assistant", content:"[\"yes\"]"}
	].concat(messages);

	// Cost tracking
	let costTracker = [];

	// The JSON array output
	let jsonArray = null;

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
		jsonArray = extractJsonArray( rd1Res.completion );

		// Validate the JSON array
		if( validator(jsonArray) !== true) {
			throw new Error(`Invalid JSON array response (validator !== true)`);
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
		// 	"content": "You are an ai assistant, who replies only with JSON arrays"
		// });
		rnd2Msgs.push({
			"role": "user",
			"content": "Please update your answer, and respond with only a single JSON array, in the requested format. No apology is needed."
		});

		// And get the completion
		try {
			const rd2Res = await getChatCompletion(rnd2Msgs, opt);
			costTracker.push( rd2Res );
	
			// // Debugging
			// console.log(rd2Res.completion)
	
			// Extract the JSON array
			lastCompletion = rd2Res.completion || lastCompletion;
			jsonArray = extractJsonArray( rd2Res.completion );
	
			// Validate the JSON array
			if( (await validator(jsonArray)) !== true) {
				throw new Error(`Invalid JSON array response (validator !== true)`);
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
	streamListener( JSON.stringify(jsonArray) )
	return {
		result: jsonArray,
		token: computeTokenCost(costTracker)
	};
}