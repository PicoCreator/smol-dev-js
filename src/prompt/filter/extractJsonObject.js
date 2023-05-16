/**
 * Given a string, extract the json array found nested within
 * @param {String} str 
 */
 module.exports = function extractJsonArray( str ) {
	// Get the first index of the json array
	const firstIndex = str.indexOf("{");
	if( firstIndex < 0 ) {
		// console.warn(str);
		throw "Missing opening JSON object bracket"
	}

	// Get the last index of the json array
	const lastIndex = str.slice(firstIndex).lastIndexOf("}");
	if( lastIndex < 0 ) {
		// console.warn(str);
		throw "Missing closing JSON object bracket"
	}

	// console.log("====")
	// console.log(str.substring(firstIndex, firstIndex + lastIndex + 1))
	// console.log("====")
	// console.log(firstIndex, lastIndex)
	// console.log("====")

	// Get the json array
	const jsonArray = str.substring(firstIndex, firstIndex + lastIndex + 1);

	// Parse it
	return JSON.parse(jsonArray);
}
