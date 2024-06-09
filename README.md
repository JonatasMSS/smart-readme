
# Smart Readme Generator 🧠

A Readme Generator that uses Generative AI to create it


## Contents
- [How it works](#How-it-Works)
- [Commands](#Commands)
- [Setup](#Setup)
- [Features](#Features)
- [How to contribute](#How-to-contribute)

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

At first, it will collect an API key that you need to use. So, after [configuring](#Setup) your API key, it will read the entire file tree in the workspace to create a JSON string that will be sent to Gemini AI Generative Language, which will return a markdown file with all the text based on the file tree of your workspace. After that, the extension will collect the text and save it to a new file, Readme.md, created in your workspace.
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

## Features

- ```✅```: Added
- ```❗```: Needs to be added

| Feature | Status |
|---------|--------|
| Read archive content| ❗|
| Allow the user select another versions of the generated readme | ❗|
| Improve the prompt to generate best readmes| ❗|


## How to contribute

We appreciate your contributions! To contribute, follow these steps:

1. **Fork the repository**
2. **Clone your fork**

    ```bash
    git clone https://github.com/your-username/your-repository.git
    cd your-repository
    ```

3. **Create a branch**

    ```bash
    git checkout -b feat/feature-name
    ```

4. **Make your changes**
5. **Commit your changes**

    ```bash
    git add .
    git commit -m "Description of the changes"
    ```

6. **Push your changes**

    ```bash
    git push origin feat/feature-name
    ```

7. **Open a Pull Request**



