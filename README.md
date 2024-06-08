
# Smart Readme Generator 🧠

A Readme Generator that uses Generative AI to create it


## Contents
- [How it works](#How-it-Works)
- [Commands](#Commands)
- [Setup](#Setup⚙)

## Commands

| Command | Action |
|---------|--------|
|```Generate Readme```| Create a Readme based on the file tree structure of the current workspace **(Needs configure the api key first)**|
|```Show Api```| Shows the current api token configured|
|```Set Api Token```| Set a new Api Token to use|
|```Reset Api Token```| Delete any api token configured on VsCode|
|```Get Current Dir```| An util command that shows the current dir of the workspace|


## How it works

The smart readme is an extension for VSCode that uses Generative Language to **create a template** to start your readme.

At first, it will collect an API key that you need to use. So, after [configuring](#configuration) your API key, it will read the entire file tree in the workspace to create a JSON string that will be sent to Gemini AI Generative Language, which will return a markdown file with all the text based on the file tree of your workspace. After that, the extension will collect the text and save it to a new file, Readme.md, created in your workspace.
## Setup

- Get the API Key on the [Google AI Studio](https://aistudio.google.com/app)

After that, you must do:

- ***Set API Key on VSCode***

Use the command ```Set Api Token```

![Set API Token Gif](https://github.com/JonatasMSS/smart-readme/assets/74430293/35330e8f-d658-484c-bc73-967f4c785aeb)

- **Open a workspace or create one**
- Generate a Readme
Use the command ```Generate Readme```

![Generate Readme](https://github.com/JonatasMSS/smart-readme/assets/74430293/f2904523-0f87-4f73-97bc-ac2472376979)

