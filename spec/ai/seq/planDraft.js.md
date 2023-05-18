# planDraft.js

This module exports a single async function `planDraft` that takes an array of chat messages in ChatML format and returns a draft plan for the user's intent.

## Function Signature

```javascript
async function planDraft(chatMessages: Array<string>): Promise<string>
```

## Parameters

- `chatMessages`: An array of strings representing the chat messages in ChatML format.

## Returns

- A Promise that resolves to a string representing the draft plan for the user's intent.

## Dependencies

- `ai.getChatCompletion`: A function from `core/ai.js` that takes an array of chat messages in ChatML format and an options object, and returns a chat completion.

## Example Usage

```javascript
const chatMessages = [
  "User: I want to create a new file called 'hello.txt' with the content 'Hello, World!'",
  "Assistant: Sure, I can help you with that. Let me draft a plan for you.",
];

const draftPlan = await planDraft(chatMessages);
console.log(draftPlan);
```

## Implementation

1. Call `ai.getChatCompletion` with the `chatMessages` array and an options object with `model` set to "gpt-4" and `max_tokens` set to 1000.
2. Extract the completion from the response.
3. Return the completion as the draft plan.