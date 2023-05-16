/**
 * Centralized global output handler, including formatting controls. 
 * Used to help manage the various output streams and their respective formats.
 * This is also used to control the surpression of unused output streams as well.
 * 
 * This is used as a global singleton "static class"
 **/

//--------------
//
//  Dependencies
//
//--------------

const chalk  = require("chalk")

//--------------
//
//  Utils
//
//--------------

function isFunction(functionToCheck) {
	return functionToCheck && (
		typeof(functionToCheck) === 'function' ||
		{}.toString.call(functionToCheck) === '[object Function]'
	);
}

function isJavascriptError(mainError) {
	return mainError && mainError.stack && mainError.message;
}

/**
 * Ensure a string output, and if the input is a function, execute it expecting a string output
 */
function normalizeString(input) {
	// Null handling
	if( input == null ) {
		return "null"
	}

	if (typeof input === 'string' || input instanceof String) {
		return input;
	}

	// Unwrap the functions
	if( isFunction(input) ) {
		return normalizeString( input() );
	}

	// If its an array, join it
	if( Array.isArray(input) ) {
		return input.join("\n")
	}

	// To string objects
	return JSON.stringify(input);
}

/**
 * Ensure an object output, and if the input is a function, execute it expecting an object output
 */
function normalizeObject(input) {
	// Unwrap the functions
	if( input && isFunction(input) ) {
		return normalizeObject( input() );
	}

	// the object as it is
	return input;
}

/**
 * Clamp the string for CLI output
 * @param {String} input 
 * @param {int} len 
 * 
 * @return normalized string
 */
function fixedWidthString(input, len = 22) {
	// Lets normalize input string
	if( input == null || input == undefined ) {
		input = "";
	}
	input = input.toString();

	// Normalize the length for handling: -1
	if( len < 0 ) {
		len = input.length;
	}

	// If input is "less" then length, pad it
	while( input.length < len ) {
		input += " ";
	}

	// Its an exact length match, return now
	if( input.length == len ) {
		return input;
	}

	// Input is larger - lets chop it and add trailing ..
	return input.slice(0, len - 2) + "..";
}

/**
 * Return a line of dashes "-" of a fixed length
 * @param {int} len 
 * 
 * @return normalized string
 */
function dashLineString(len = 22) {
	// Prepare the dash line
	let ret = "";
	while( ret.length < len ) {
		ret += "-";
	}

	// Return the dash line
	return ret;
}

//--------------
//
//  Module implementation
//
//--------------

//
//  Class implementation (to be initialized)
//
class OutputHandlerClass {

	//--------------
	// OutputHandler Setup
	//--------------

	/**
	 * Constructor for the OutputHandler
	 */
	constructor() {
		// Default config values
		this.stdOutput      = true;
		this.tableOutput    = false;
		this.jsonOutput     = false;
		// this.jsonOutputFile = null;

		this.trace  = false;
		this.silent = false;
	}

	/**
	 * Setup the required arguments for sywac to process output configurations
	 * 
	 * @param {sywac} main 
	 */
	argsSetup_output( main ) {
		
		// Self reference
		let self = this;

        // We disabled the --json, and --table
        // --------------------------------------------

		// // The various configuration options
		// main.boolean("--json, --jsonOutput", {
		// 	description: "Output result as a single final JSON object, disables default step by step line output"
		// })

		// // Output using table format instead
		// main.boolean("--table, --tableOutput", {
		// 	description: "Output result in a table like format, note that some commands (eg. list) defaults to this format"
		// })

		// @TODO - consider if there is demand to support this use case specifically
		// main.file("--jsonOutputFile <json-out-file>", {
		// 	description: "Output the JSON result into the file seperately, does not disable step by step line output"
		// })

        // Trace and silent supporessions
        // --------------------------------------------
		main.boolean("-t, --trace", {
			description: "Extremely extremely verbose and noisy logging of all API calls [Note: this will log provided secrets]"
		})
		main.boolean("-s, --silent", {
			description: "Surpression of output stream, disables std/json output"
		})

		// Processing the various configuration settings
		main.layeredCheck((argv, context) => {
			if( argv.table || argv.tableOutput ) {
				this.stdOutput   = false;
				this.tableOutput = true;
				this.jsonOutput  = false;
			}
			if( argv.json || argv.jsonOutput ) {
				this.stdOutput   = false;
				this.tableOutput = false;
				this.jsonOutput  = true;
			}
			// if( argv.jsonOutputFile ) {
			// 	this.jsonOutputFile = arv.jsonOutputFile;
			// }
			if( argv.trace ) {
				this.trace = true;
			}
			if( argv.silent ) {
				this.silent      = true;
				this.stdOutput   = false;
				this.jsonOutput  = false;
				this.tableOutput = false;
			}
		});
	}
	
	//--------------
	// OutputHandler Error Helpers
	//--------------

	/**
	 * Output an error message, without exiting
	 * 
	 * @param {String} mainError message to send
	 */
	errorMessage(mainError) {
		let errStr = "[ERROR] "+mainError;
		if(errStr == "[object Object]") {
			errStr = JSON.stringify(mainError);
		}
		console.error( chalk.red(errStr) );
	}

	/**
	 * argument handling error,
	 * This is used for exceptions thrown while processing and validating command line arguments
	 * 
	 * Note that argument exceptions, ignores the --silent setting
	 * 
	 * @param {String} mainError message to send
	 * @param {String} helpMessage [optional] additional message to send, defaults to "use -h"
	 */
	cliArgumentError(mainError, helpMessage = "[Use -h for more help information]") {
		console.error( chalk.red("[CLI ARGUMENT ERROR] "+mainError)+"\n"+chalk.dim(helpMessage) );
		process.exit(1);
	}

	/**
	 * Generic handler error, which would terminate the CLI
	 * 
	 * @param {String|Function} mainError message to send
	 * @param {Error} errObj to stack trace, if provided
	 * @param {int} errCode to optionally define
	 */
	fatalError(mainError, errObj = null, errCode = 42) {
		// Handle if errCode is passed directly (instead of object)
		if( !isNaN(errObj) ) {
			errCode = errObj;
			errObj = null;
		}

		// This is a JS Exception passed directly (probably?)
		// lets change the format accordingly
		if ( isJavascriptError(mainError) ) {
			errObj = mainError;
			mainError = mainError.message;
		}

		// Normalize the input first
		mainError = normalizeString(mainError);

		// Handle stdOutput - if enabled
		if( this.stdOutput ) {

			if (typeof mainError === 'string' || mainError instanceof String) {
				// Output of Err string
				console.error( chalk.red("[FATAL ERROR] "+JSON.stringify(mainError)) );
				if( errObj ) {
					console.error(errObj);
				}
			} else {
				// Handling of errors when "mainError" is an object
				console.error( chalk.red("[FATAL ERROR]") );
				if( mainError ) {
					console.error(mainError);
				}
				if( errObj ) {
					console.error(errObj);
				}
			}

		}
		
		// Json Output Handling
		if( this.jsonOutput ) {
			let jsonErr = {
				"ERROR": {
					"type": "FATAL ERROR",
					"message": mainError
				}
			};
			console.error( JSON.stringify(jsonErr, null, 3) );
		}

		// Exit with the given error code
		process.exit(errCode);
	}
	
	//--------------
	// Trace event handling
	//--------------

	/**
	 * Output the debug/trace log, only if the respective --trace flag is enabled
	 * 
	 * @param {String|Function} log to output
	 * @param {Error} errObj to stack trace, if provided
	 */
	debug(log, errObj) {
		// Does nothing if trace is not enabled
		// or if stdOutput is not enabled
		if(!this.trace || !this.stdOutput) {
			return;
		}

		// Normalize the input first
		log = normalizeString(log);

		// Handle stdOutput - if enabled
		console.log( chalk.dim(log) );
		if( errObj ) {
			console.log(errObj);
		}
	}

	/**
	 * Output the debug/trace log, only if the respective --trace flag is enabled
	 * 
	 * @param {String|Function} log to output, inside a "---" line block
	 * @param {Error} errObj to stack trace, if provided
	 */
	debugBlock(log, errObj) {
		// Does nothing if trace is not enabled
		if(!this.trace || !this.stdOutput) {
			return;
		}
		
		// Normalize the input first
		log = normalizeString(log);

		// Handle stdOutput - if enabled
		console.log( chalk.dim("--------------------------------------------------") );
		console.log( chalk.dim(log) );
		if( errObj ) {
			console.log(errObj);
		}
		console.log( chalk.dim("--------------------------------------------------") );
	}
	
	//--------------
	// Standard output
	//--------------

	/**
	 * Triggers the provided function, if standard output is enabled
	 * Else does nothing.
	 * 
	 * @param {Function} func to execute
	 */
	async ifStandard(func) {
		// Does nothing if not enabled
		if(!this.stdOutput) {
			return;
		}

		await func();
	}

	/**
	 * Standard output log, enabled unless --silent is used
	 * 
	 * @param {String|Function} log to output
	 */
	standard(log) {
		// Does nothing if not enabled
		if(!this.stdOutput) {
			return;
		}
		
		// Normalize the input first
		log = normalizeString(log);

		// And output it
		console.log( log );
	}
	
	/**
	 * Standard output log varient for green color, enabled unless --silent is used
	 * 
	 * @param {String|Function} log to output
	 */
	standardGreen(log) {
		// Does nothing if not enabled
		if(!this.stdOutput) {
			return;
		}
		
		// Normalize the input first
		log = normalizeString(log);

		// And output it
		console.log( chalk.green(log) );
	}
	
	/**
	 * Standard output log varient for red color, enabled unless --silent is used
	 * 
	 * @param {String|Function} log to output
	 */
	standardRed(log) {
		// Does nothing if not enabled
		if(!this.stdOutput) {
			return;
		}
		
		// Normalize the input first
		log = normalizeString(log);

		// And output it
		console.log( chalk.red(log) );
	}
	
	//--------------
	// Table output
	//--------------

	/**
	 * Table output format
	 * 
	 * This is enabled only when table mode is enabled
	 * 
	 * @param {Array<Object>} table  collection of objects, to output
	 * @param {Array<String>} keys   collumn keys to output
	 * @param {Array<Int>}    width  collumn widths to output, if null this is auto detected
	 */
	table(table, keys = null, width = null) {
		// Does nothing if not enabled
		if(!this.tableOutput) {
			return;
		}
		return this.standardTable(table,keys,width);
	}

	/**
	 * Table header output format
	 * 
	 * This is enabled only when table mode is enabled
	 * 
	 * @param {Array<String>} headerArray containing header names 
	 * @param {Array<Int>}    widthArray
	 */
	tableHeader(headerArray, widthArray = []) {
		// Does nothing if not enabled
		if(!this.tableOutput) {
			return;
		}
		return this.standardTableHeader(headerArray,widthArray);
	}

	/**
	 * Table row output format
	 * 
	 * This is enabled only when table mode is enabled
	 * 
	 * @param {Array<String>} dataArray 
	 * @param {Array<Int>}    widthArray
	 */
	tableRow(dataArray, widthArray = []) {
		// Does nothing if not enabled
		if(!this.tableOutput) {
			return;
		}
		return this.standardTableRow(dataArray,widthArray);
	}

	//--------------
	// Standard / Table output
	//--------------

	/**
	 * Standard output log, in a table format 
	 * 
	 * This is enabled if either standard, or table mode is enabled
	 * 
	 * @param {Array<Object>} table  collection of objects, to output
	 * @param {Array<String>} keys   collumn keys to output
	 * @param {Array<Int>}    width  collumn widths to output, if null this is auto detected
	 */
	standardTable(table, keys = null, width = null) {
		// Does nothing if not enabled
		if(!(this.stdOutput || this.tableOutput)) {
			return;
		}

		// Normalize the table
		table = normalizeObject(table);
		
		// Lets setup the default width sizing
		if( width == null ) {
			width = [];

			// Lets iterate each key
			// and configure the width
			for(let i=0; i<keys.length; ++i) {
				// Get the key
				let key = keys[i];

				// Calculate key width, given output
				let keyWidth = key.length;

				// Lets loop through each table item
				for(let t=0; t<table.length; ++t) {
					
					// Extract line value 
					// with the relevent key
					let tableItem = table[t];
					let value = tableItem[key];

					// NULL handling
					if( value == null ) {
						value = "";
					}

					// Non string value handling
					if( !(typeof value === 'string' || value instanceof String) ) {
						value = JSON.stringify(value);
					}

					// Normalize the length
					// unless its the last key
					keyWidth = Math.max(keyWidth, value.length || 0);
					if( keyWidth > 25 && i<(keys.length - 1) ) {
						keyWidth = 25;
						break;
					}
				}
				
				// Lets save the key width
				width[ i ] = keyWidth;
			}
		}

		// @TODO - refactor this segment below to use 
		//         standardHeader/row aka DRY cleanup

		// Lets handle the headers
		let headerRow  = "";
		let headerLine = "";
		for(let k=0; k<keys.length; ++k) {
			// Lets add the end padding
			if( k>0 ) {
				headerRow  += "  ";
				headerLine += "  ";
			}

			// Handle length
			let collumnLength = width[k];
			if( collumnLength < 0 ) {
				collumnLength = keys[k].length;
			}

			// Row and lines text handling
			headerRow  += fixedWidthString(keys[k], collumnLength);
			headerLine += dashLineString(collumnLength);
		}

		// Lets output the header
		console.log( headerRow );
		console.log( headerLine );

		// Lets loop through each table item
		for(let i=0; i<table.length; ++i) {
			// Get the table item 
			let tableItem = table[i];
			let tableLine = "";

			// Lets iterate the keys
			for(let k=0; k<keys.length; ++k) {
				// Lets add the end padding
				if( k>0 ) {
					tableLine  += "  ";
				}
				
				// Table line content
				tableLine += fixedWidthString( tableItem[ keys[k] ], width[k] );
			}

			// Output the line
			console.log( tableLine );
		}
	}
	
	/**
	 * Standard output log, in a header format 
	 * 
	 * This is enabled if either standard, or table mode is enabled
	 * 
	 * @param {Array<String>} headerArray containing header names 
	 * @param {Array<Int>}    widthArray
	 */
	standardTableHeader(headerArray, widthArray = []) {
		// Does nothing if not enabled
		if(!(this.stdOutput || this.tableOutput)) {
			return;
		}

		// Does the header line first
		this.standardTableRow(headerArray, widthArray);

		// Does the dash line
		let headerLine = "";
		for(let k=0; k<headerArray.length; ++k) {
			// Lets add the end padding
			if( k>0 ) {
				headerLine += "  ";
			}

			// Handle length
			let collumnLength = widthArray[k];
			if( collumnLength < 0 ) {
				collumnLength = headerArray[k].length;
			}

			// Row and lines text handling
			headerLine += dashLineString(collumnLength);
		}

		// Output the dash line
		console.log( headerLine );
	}

	/**
	 * Standard output log, in a row format, this is used together with standardHeader
	 * 
	 * This is enabled if either standard, or table mode is enabled
	 * 
	 * @param {Array<String>} dataArray 
	 * @param {Array<Int>}    widthArray
	 */
	standardTableRow(dataArray, widthArray = []) {
		// Does nothing if not enabled
		if(!(this.stdOutput || this.tableOutput)) {
			return;
		}

		// The row to output
		let rowLine = "";

		// Lets iterate the values
		for(let k=0; k<dataArray.length; ++k) {
			// Lets add the end padding
			if( k>0 ) {
				rowLine  += "  ";
			}
			
			// Handle length
			let collumnLength = widthArray[k];
			if( collumnLength < 0 ) {
				collumnLength = dataArray[k].length;
			}

			// Table line content
			rowLine += fixedWidthString( dataArray[k], collumnLength );
		}

		// Output the line
		console.log( rowLine );
	}

	//--------------
	// JSON output
	//--------------

	/**
	 * JSON output, to be handled if the respective mode is enabled
	 * 
	 * @param {Object} data to json output
	 */
	json(data) {
		// Does nothing if not enabled
		if(!this.jsonOutput && this.jsonOutputFile) {
			return;
		}

		// Get the JSON stringified content
		let jsonStr = JSON.stringify( data, null, 3 );

		// JSON output handling
		if( this.jsonOutput ) {
			console.log( jsonStr );
		}

		// @TODO --jsonOutputFile handling
	}
}

// Actual module export
const OutputHandler = new OutputHandlerClass();
OutputHandler.class = OutputHandlerClass;
module.exports = OutputHandler;