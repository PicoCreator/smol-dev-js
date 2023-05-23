# spec2code.js

This command will generate source code from a specification markdown file.

It will:

- Prompt the user to select a spec markdown file
- Load and parse the selected spec file
- Generate the corresponding source code file
- Output the generated source code to the console

The spec file should be in the format:

```
# Function name

- Description: What the function does
- Parameters: 
	- param1: Type - Description
	- param2: Type - Description 
- Returns: Return type
- Code:

```

For example:

```
# addNumbers

- Description: Adds two numbers together
- Parameters: 
	- num1: Number - The first number
	- num2: Number - The second number
- Returns: Number
- Code:

function addNumbers(num1, num2) {
  return num1 + num2;
}
```

The command will parse this and generate the following JavaScript code:

```js
function addNumbers(num1, num2) { 
  return num1 + num2; 
}
```

It will then output this to the console.

The user can then copy and paste this into their source code file.