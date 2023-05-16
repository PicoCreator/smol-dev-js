/**
 * Utility function to normalize the token cost from various formats
 * Into a standard one we intend to use for our API
 */
 module.exports = function computeTokenCost( resObjects ) {
	// The return cost format
	let ret = {
		used: {
			prompt:0,
			completion:0,
			embedding:0,
			calls:0,
			action:0
		},
		cache: {
			prompt:0,
			completion:0,
			embedding:0,
			calls:0,
			action:0
		}
	}

	// If its not an array, make it an array
	if( !Array.isArray(resObjects) ) {
		resObjects = [resObjects];
	}

	// Flatten the array
	resObjects = resObjects.flat(Infinity);

	// Loop through each object
	for( const rObj of resObjects ) {
		// If its an existing token cost obj
		if( rObj.used && rObj.cache ) {
			ret.used.prompt += rObj.used.prompt || 0;
			ret.used.embedding += rObj.used.embedding || 0;
			ret.used.completion += rObj.used.completion || 0;
			ret.used.calls += rObj.used.calls || 0;
			ret.used.action += rObj.used.action || 0;
			ret.cache.prompt += rObj.cache.prompt || 0;
			ret.cache.embedding += rObj.cache.embedding || 0;
			ret.cache.completion += rObj.cache.completion || 0;
			ret.cache.calls += rObj.cache.calls || 0;
			ret.cache.action += rObj.cache.action || 0;
			continue;
		}

		// If its an AI response object
		if( rObj.token && (rObj.token.prompt || rObj.token.embedding) && rObj.model ) {
			if( rObj.token.cache === true ) {
				ret.cache.prompt += rObj.token.prompt || 0;
				ret.cache.embedding += rObj.token.embedding || 0;
				ret.cache.completion += rObj.token.completion || 0;
				ret.cache.calls += rObj.token.calls || 1;
				ret.cache.action += computeActionCost(rObj);
			} else {
				ret.used.prompt += rObj.token.prompt || 0;
				ret.used.embedding += rObj.token.embedding || 0;
				ret.used.completion += rObj.token.completion || 0;
				ret.used.calls += rObj.token.calls || 1;
				ret.used.action += computeActionCost(rObj);
			}
			continue;
		}

		// If its an existing token cost obj, nested in token attribute
		if( rObj.token && rObj.token.used && rObj.token.cache ) {
			ret.used.prompt += rObj.token.used.prompt || 0;
			ret.used.embedding += rObj.token.used.embedding || 0;
			ret.used.completion += rObj.token.used.completion || 0;
			ret.used.calls += rObj.token.used.calls || 0;
			ret.used.action += rObj.token.used.action || 0;
			ret.cache.prompt += rObj.token.cache.prompt || 0;
			ret.cache.embedding += rObj.token.cache.embedding || 0;
			ret.cache.completion += rObj.token.cache.completion || 0;
			ret.cache.calls += rObj.token.cache.calls || 0;
			ret.cache.action += rObj.token.cache.action || 0;
			continue;
		}

		// Does nothing, not a match?
	}

	// Return the final compute cost
	return ret;
}

//
// Compute the action cost, give the ai-bridge response
//
function computeActionCost(rObj) {
	let model = rObj.model || rObj.token.model || "gpt-4";
	let tokenObj = rObj.token || rObj;

	// Lets compute the openAI cost rate
	let rawCost = 0;

	// If there was a completion, there was probably a query
	if( tokenObj.completion > 0 ) {

		// Adjust price as per model
		if( model.startsWith("gpt-3.5") ) {
			// its $0.002 per 1000 token
			rawCost = (
				(tokenObj.prompt || 0) / 1000 * 0.002 +
				(tokenObj.completion || 0) / 1000 * 0.002
			);
		} else { //if( model.startsWith("gpt-4") )
			// we assume gpt4 rates : 
			// its $0.03 per 1000 prompt token
			//     $0.06 per 1000 completion token
			rawCost = (
				(tokenObj.prompt || 0) / 1000 * 0.03 +
				(tokenObj.completion || 0) / 1000 * 0.06
			);
		} 
	}

	// For embedding we assume its "text-embedding-ada-002" for now
	// if( model.startsWith("text-embedding-ada-002") ) {
		// its $0.0004 / 1K tokens
		rawCost += (
			(tokenObj.embedding || 0) / 1000 * 0.0004
		);
	// }

	// Lets get the amount allocated for a single action
	let action = 0.01;

	// Lets get the margin multiplier
	let margin = 1.50;

	// Lets comptue and return the number of actions, this is "worth"
	let actionCount = (rawCost * margin / action);

	// Round up to the nearest 3 decimal places, and return
	return Math.ceil(actionCount * 1000) / 1000;
}
