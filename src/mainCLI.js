#!/usr/bin/env node

//--------------
//
//  Dependencies
//
//--------------

const MainSywac = require("./cli/MainSywac");
const OutputHandler = require("./cli/OutputHandler")

//--------------
//
// Various argument handling setup
//
//--------------

//--------------
//
// Command handling
//
//--------------

MainSywac.command("setup", require("./cli/command/setup"))
MainSywac.command("prompt", require("./cli/command/prompt"))
MainSywac.command("code2spec", require("./cli/command/code2spec"))
MainSywac.command("spec2code", require("./cli/command/spec2code"))

//--------------
//
// Examples !!!
//
//--------------


//--------------
//
// Time to let the CLI run!
//
//--------------

// Enable strict mode
MainSywac.strict(true);

// Parse and exit
MainSywac.parseAndExit().then(argv => {
	// Unparsed segments are placed into: argv._
	// as such we should terminate ! if any unknown command is found
	if( argv._.length > 0 ) {
		OutputHandler.cliArgumentError("Unknown command: "+argv._.join(" "))
	}
});