# Code2Spec Command

The `code2spec` command is a CLI command that generates a spec file from a given source code file. It uses AI models to analyze the source code and create a corresponding specification file in markdown format.

## Usage

```
code2spec [options] <sourceCodeFile>
```

### Options

- `-o, --output <outputFile>`: Specify the output file for the generated spec. If not provided, the spec will be generated in the same directory as the source code file with a `.md` extension.

## Implementation

The `code2spec` command is implemented in the `cli/command/code2spec.js` file. It uses the following modules and functions:

- `ai.getChatCompletion`: To communicate with the AI models and generate the spec content.
- `fs.promises`: To read and write files.
- `core/ai.js`: For API calls to the AI models.
- `util/scanDirectory.js`: To scan the project directory for source code files.

## Workflow

1. Parse the command line arguments and options.
2. Read the source code file using `fs.promises`.
3. Call the `ai.getChatCompletion` function with the source code content and AI model options.
4. Process the AI model response and generate the spec content in markdown format.
5. Write the generated spec content to the output file using `fs.promises`.

## Example

Suppose you have a source code file `src/example.js` and you want to generate a spec file for it. You can use the `code2spec` command as follows:

```
code2spec src/example.js -o specs/example.md
```

This will generate a spec file `specs/example.md` based on the content of `src/example.js`.