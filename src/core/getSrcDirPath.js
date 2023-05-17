const config = require("./config")
const CWD = process.cwd();
const path = require("path");

module.exports = function getSrcDirPath() {
	return path.resolve(CWD, config.config.src_dir || "./")
}