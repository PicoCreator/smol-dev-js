# Smol-Dev-JS

You own personal AI dev, which you can direct development in a collebrative back and forth experience.
Think of it as pair-programming, via the command line.

Written entire in JS (no python), and is able to make both "smol-er" changes (you can ask it to change a few lines or a file or two), 
or "big-ger" changes (ie. generate a full project from specs for you) - the choice is urs.

This switches your role from a developer, to a "senior developer" - where you are instructing your junior developers what to do (and hope they get it right).

For best results: Generally treat the AI like a junior developer who joined the project on day 0, and is still learning the ropes. And you are the senior developer who is teaching it - and making small incremental changes - and you will get better result as you prompt your way in a loop.

> Not no code, not low code, but some third thing.

Allowing you to focus on ~~sword fighting~~ the big picture, while the AI does the ~~button mashing~~ coding for you.

Its light weight enough, that at any point of time, you can take back full control. Once the AI stops adding value.

<p align="center">
  <img height=200 src="https://pbs.twimg.com/media/FwEzVCcaMAE7t4h?format=jpg&name=large" />
</p>

Additionally, because the changes are small, incremental, and runs in a tight loop you are in full control of. You do not need to worry about it going out of control ~~like some autonomous agents~~. Allowing you to review each commit, and revert them or make changes yourself if needed.

> Quoting the original smol-dev : does not end the world or overpromise AGI. instead of making and maintaining specific, rigid, one-shot starters, like create-react-app, or create-nextjs-app, this is basically [`create-anything-app`](https://news.ycombinator.com/item?id=35942352) where you develop your scaffolding prompt in a tight loop with your smol dev.

# How to setup

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

> It is highly recommended to use anthropic claude, if you have the API key, as its so much faster and more reliable then openAI as of now for this use case.

# How to run it

Run the following command to start the smol-dev-js process, from your project

```bash
cd my-js-project
smol-dev-js run
```

![smol-dev-run](https://raw.githubusercontent.com/PicoCreator/smol-dev-js/main/docs/smol-dev-run.gif)

# Optimization notes

This is currently targetted to be optimized only for JS. The reduced scope is intentional, so that we can optimize its responsiveness and usage, without over-inflating the project.

## Backstory

V1 prototype was the [English Compiler](https://github.com/uilicious/english-compiler), made in Feb 2023

While it technically works, were faced with multiple context size related issues.

Fast forward 3 months, and the context size of models have jumped from 4k, to 8k for public users. And 32k and 100k for private users.

Subsequently the [smol-ai/dev](https://github.com/smol-ai/developer/) project has shown that with only 8k context size and gpt4, we have slowly reached the stage where the output is starting to "just work"

This project is subsequently a full rewrite of the original `English Compiler` project, along with reimagining the approach based lessons learnt from the original and `smol-ai/dev`
