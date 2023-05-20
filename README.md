# Smol-Dev-JS

You own personal AI dev, which you can direct development in a collebrative back and forth experience.
Think of it as pair-programming, via the command line.

Written entire in JS (no python), and is able to make both "smol-er" changes (you can ask it to change a few lines or a file or two), 
or "big-ger" changes (ie. generate a full project from specs for you) - the choice is urs.

This switches your role from a developer, to a "senior developer" - where you are instructing your junior developers what to do (and hope they get it right).

For best results: Generally treat the AI like a junior developer who joined the project on day 0, and is still learning the ropes. And you are the senior developer who is teaching it - and making small incremental changes - and you will get better result as you prompt your way in a loop.

> Not no code, not low code, but some third thing.

Allowing you to focus on ~~sword fighting~~ the big picture, while the AI does the ~~button mashing~~ coding for you.

<p align="center">
  <img height=200 src="https://pbs.twimg.com/media/FwEzVCcaMAE7t4h?format=jpg&name=large" />
</p>

Additionally, because the changes are small, incremental, and runs in a tight loop you are in full control of. You do not need to worry about it going out of control ~~like some autonomous agents~~. Allowing you to review each commit, and revert them or make changes yourself if needed.

> Quoting the original smol-dev : does not end the world or overpromise AGI. instead of making and maintaining specific, rigid, one-shot starters, like create-react-app, or create-nextjs-app, this is basically [`create-anything-app`](https://news.ycombinator.com/item?id=35942352) where you develop your scaffolding prompt in a tight loop with your smol dev.

# Commands & Setup

## smol-dev-js setup

Install via NPM

```bash
npm install -g smol-dev-js
```

Either start a new JS project, or go to an existing nodejs project, run the setup function, and follow the process

```bash
cd my-js-project
smol-dev-js setup
```

![smol-dev-setup](https://raw.githubusercontent.com/PicoCreator/smol-dev-js/main/docs/smol-dev-setup.gif)

This will ask for your API keys, and setup the `.smol-dev-js` folder which it will use internally for you

> It is highly recommended to use anthropic claude, if you have the API key, as its so much faster and more reliable then openAI as of now for this use case. For openAI this uses gpt4-8k for the heavy lifting, while downgrading to gpt3.5 for some smol-er task

## smol-dev-js run

Run the following command to start the smol-dev-js process, in your new or existing JS project

```bash
cd my-js-project
smol-dev-js run
```

![smol-dev-run](https://raw.githubusercontent.com/PicoCreator/smol-dev-js/main/docs/smol-dev-run.gif)

Once everything is generated, review the code and begin a loop where you ...

> engineering with prompts, rather than prompt engineering

Found an error? paste it in and let the AI suggest a fix for you. Or tell it what to do to fix it.

Loop until happiness is attained. Or that you find the AI being unhelpful, and take back control.

## smol-dev-js spec2code

Got all your project specifications file ready? Run th spec2code, and let the smol-dev AI generate it for you.

The general format of the spec folder should be
- `README.md` (high level spec)
- `NOTES.md` (any more point form feedback/instruction to pass to the AI globally, which may might not make sense in the spec)
- `<folder>/<filename>.<type>.md` (spec for a specific file)

> You will need the spec folder to be configured

## smol-dev-js code2spec

Lazy to write specs to an existing codebase from scratch, let the smol-dev AI generate a draft for you.

> You will need the spec folder to be configured

## I would like to customize the settings further

After generating the config, you can look into `.smol-dev-js/config` folder for various settings, including
- caching with mongoDB (you can use the free tier)

# Example Usage

![Spec prompt to code](https://github.com/smol-ai/developer/assets/6764957/15fa189a-3f52-4618-ac8e-2a77b6500264)

> this is from the original smol-dev, with a single README.md as the spec.

# Notes

## Innovation and insights

- **Anthropic AI current laps openAI** : While it needed some prompt changes. Even with a single "thread" it laps around 4 threads of gpt 3.5 /and gpt4. This is before we even take into account its support for 100k context size

- **Context size is still king** : This is a huge jump from the english compiler proj, and while AI reasoning is a factor, context size truely made it a giant leap - cant wait till 32k is affordable and commonplace

- **Debug via prompting** : Better then just using chat-gpt directly, now you got more project specific answers

- **Low activation energy for unfamiliar APIs** : Have no idea how to get started? Just start with a one line prompt, and let the system draft everything for you

- **Want to write your specs for prompting??** : Just let the AI know what you want to change. Even in broken english (or any other language)

- **Modal is not needed** : All you need is node+NPM. We use the HTTP API directly, so no python dependencies, we include retry logic for error handling, spliting up into multiple requests, and even include caching to optimize some of the more reptitive smol ops.

## Cavet

Unless your the lucky few who gotten access to antrohpic AI, GPT4 can be very very slow. Making the feedback loop run into several minutes (this will improve over time as AI scales up worldwide)

## Future direction??

Want to have this working locally? Without an internet connection?

- Donate your `.smol-dev-js/cache` folder if your not working on anything sensitive, so that I can use it as training data for a local model (ps: if you email me the files, i assume you waived copyright for it)


## Optimization notes

This is currently targetted to be optimized only for JS. The reduced scope is intentional, so that we can optimize its responsiveness and usage, without over-inflating the project.

## Backstory

V1 prototype was the [English Compiler](https://github.com/uilicious/english-compiler), made in Feb 2023

While it technically works, it was faced with multiple context size related issues.

Fast forward 3 months, and the context size of models have jumped from 4k, to 8k for public users. And 32k and 100k for private users.

Subsequently the [smol-ai/dev](https://github.com/smol-ai/developer/) project has shown that with only 8k context size and gpt4, we have slowly reached the stage where the output is starting to "just work"

This project is subsequently a full rewrite of the original `English Compiler` project, along with reimagining the approach based lessons learnt from the original and `smol-ai/dev`
