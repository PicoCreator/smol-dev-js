const path = require("path");
const getPromptBlock = require("../builder/getPromptBlock");

/**
 * Get the list of project dependencies as a giant usable prompt string
 */
module.exports = async function getProjectSettings() {
	// Get the CWD
	let cwd = process.cwd();

	// The final return string arr to build
	let returnStringArr = [];

	// Get the package.json if its available
	let packageJson = null;
	try {
		packageJson = require(path.resolve(cwd, "package.json"));
	} catch(e) {
		// Do nothing
	}

	// If the package.json is available, lets get the dependencies
	if( packageJson ) {
		// Get the tragetted node version
		let nodeVersion = packageJson.engines && packageJson.engines.node ? packageJson.engines.node : null;
		if( nodeVersion == null ) {
			nodeVersion = ">=18.0.0"
		}
		returnStringArr.push("Target Node version : " + nodeVersion);

		// Get the dependencies
		let depObj = packageJson.dependencies || {};
		let devDepObj = packageJson.devDependencies || {};

		// Lets map it over as a string
		let depString = Object.keys(depObj).map((depName) => {
			return `${depName} = ${depObj[depName]}`;
		}).join("\n").trim();
		let devDepString = Object.keys(devDepObj).map((depName) => {
			return `${depName} = ${devDepObj[depName]}`;
		}).join("\n").trim();

		// Lets build them into a prompt block
		if( depString.length > 0 ) {
			returnStringArr.push( await getPromptBlock("NPM modules installed", depString) );
		}
		if( devDepString.length > 0 ) {
			returnStringArr.push( await getPromptBlock("NPM dev modules installed", devDepString) );
		}
	}

	// Return the joint string
	return returnStringArr.join("\n\n").trim();
}