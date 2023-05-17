const config = require("./config")
const CWD = process.cwd();
const path = require("path");

module.exports = function getSrcDirPath() {
	let configSpecDir = config.config.spec_dir || null;
	if( configSpecDir == null || configSpecDir == "" ) {
		return null;
	}
	return path.resolve(CWD, configSpecDir);
}