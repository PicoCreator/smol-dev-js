/**
 * Minor customization done to "sywac" instance, for our own use case.
 * Which is initialized and exported.
 * 
 * This does NOT trigger the `parseAndExit` chain of the CLI
 **/

//--------------
//
//  Dependencies
//
//--------------

const sywac   = require("sywac")
const chalk   = require("chalk")
const version = require("../version")

const OutputHandler  = require("./OutputHandler")

//--------------
//
//  Setup main CLI function
//
//--------------

// Lets do the basic setup
let main = sywac
	.help("-h, --help")
	.version("-v, --version", {
		version: version
	})
	.showHelpByDefault()

//--------------
//
// Check overloading
//
//--------------

// Checking function to use
let checkFunctions = [];
// Main checking function logic
main.check(async function(argv, context) {
	// Skip validation - if help command is used
	if(argv.help || argv._[1] == "help") {
		return;
	}
	
	// Iterate various validations
	try {
		for(let i=0; i<checkFunctions.length; ++i) {
			await checkFunctions[i](argv, context);
		}
	} catch(err) {
		OutputHandler.cliArgumentError(err)
	}
});
// Lets null it out (to force an error if anyone uses)
main.check = null;

/**
 * Layred check, this allow the implementation of multiple checking functions
 * Which would all be executed together, via "check" in one go.
 * 
 * This allows multiple modules to setup their own checking function without overwriting
 * any of the existing checks. Failing when needed as well
 * 
 * @param {Function} handler to register for layered check, this can be an async function.
 */
main.layeredCheck = function(handler) {
	checkFunctions.push(handler);
	return main;
}

//--------------
//
// Style overwrites
//
//--------------

main.style({
	// Custom styling for flags / prefix
	flags: (str, type) => {
		let style = type.datatype === 'command' ? chalk.magenta : chalk.cyan
		// if (str.startsWith('-')) style = style.dim
		return style(str)
	},
	desc: (str) => { 
		// There is special notes handling
		let pos = str.indexOf("[")
		if( pos > 0 ) {
			let desc = str.substring(0, pos);
			let note = str.substring(pos);
			return chalk.green(desc)+chalk.dim(note)+chalk.reset(" "); 
		} 
		return chalk.green(str)+chalk.reset(""); 
	},

	// This is the [placeholders] texts, with some annoying ones
	hints: (str) => {
		str = str.replace(/\[(string|boolean|number|file|commands\:.*|aliases\:.*)\]/gi,"")
		return chalk.dim(str)
	},

	// Other styles
	usagePrefix: str => {
		return chalk.white(str.slice(0, 6)) + ' ' + chalk.magenta(str.slice(7))
	},
	usageOptionsPlaceholder: str => chalk.green.dim(str),
	usageCommandPlaceholder: str => chalk.magenta(str),
	usagePositionals: str => chalk.green(str),
	usageArgsPlaceholder: str => chalk.green(str),
	group: str => chalk.white(str),
	
	// use different style when a type is invalid
	groupError: str => chalk.red(str),
	flagsError: str => chalk.red(str),
	descError: str => chalk.yellow(str),
	hintsError: str => chalk.red(str),
	// style error messages
	messages: str => chalk.red(str)
})
main.outputSettings({
	maxWidth: Math.min(95, process.stdout.columns)
})

//--------------
//
// Preface / Epilogue bling
//
//--------------

//
// Preface string to use
// generate using : http://patorjk.com/software/taag/#p=display&h=0&f=Big&t=UI-licious
//
// Note that the string needs to be fixed with "\" escape
//
const preface_str = (`
### Smol-Dev-JS ###
`).slice(1);

// Load the preface
main.preface(
	chalk.green(preface_str),
	chalk.green(" ~ Copilot your AI dev, in a pair programming session ~")
);
main.epilogue( "Now anyone can code (debugger not included)\n"+chalk.dim("PS: if you are seeing this in a response to a command, it probably was an invalid command") );

//--------------
//
// Module Export
//
//--------------
module.exports = main;
