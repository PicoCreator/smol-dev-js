const fs = require('fs');
const path = require('path');

/**
 * Read and return the file content if the file exists, otherwise return null
 * @param {String} filepath 
 * @param {String} fallback
 */
module.exports = async function readFileOrNull(filepath, fallback = null) {
    try {
        return await fs.promises.readFile(filepath, "utf8");
    } catch(e) {
        // do nothing
    }
    return fallback;
}