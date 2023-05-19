# Smol-Dev-JS

You own personal AI dev, which you can direct development in a collebrative back and forth experience.

Think of it as pair-programming, via the command line.

# Optimization notes

This is currently targetted to be optimized only for JS. The reduced scope is intentional, so that we can optimize its responsiveness and usage, without over-inflating the project.

## Backstory

V1 prototype was the [English Compiler](https://github.com/uilicious/english-compiler), made in Feb 2023

While it technically works, were faced with multiple context size related issues.

Fast forward 3 months, and the context size of models have jumped from 4k, to 8k for public users. And 32k and 100k for private users.

Subsequently the [smol-ai/dev](https://github.com/smol-ai/developer/) project has shown that with only 8k context size and gpt4, we have slowly reached the stage where the output is starting to "just work"

This project is subsequently a full rewrite of the original `English Compiler` project, along with reimagining the approach based lessons learnt from the original and `smol-ai/dev`
