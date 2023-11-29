#!/usr/bin/env node

// Does a rather hacky fix of node modules
// for known dependency issues.
// ---

// // Inside the node_modules/ent/encode.js , and node_modules/ent/decode.js file replace the line
// // `var punycode = require('punycode');` with `var punycode = require('punycode/');`
// // This is a known issue with the `ent` module.
// const fs = require('fs');
// const files = ['./node_modules/ent/encode.js', './node_modules/ent/decode.js'];

// files.forEach((filePath) => {
// 	let fileContent = fs.readFileSync(filePath, 'utf8');
// 	fileContent = fileContent.replace("var punycode = require('punycode');", "var punycode = require('punycode/');");
// 	fs.writeFileSync(filePath, fileContent);
// });