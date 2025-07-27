ClassTrim

A lightweight VSCode extension that automatically cleans up your class and className attributes. It removes extra whitespace, deletes duplicate classes, and normalizes spacing to keep your markup tidy.
Features

✨ Automatic Formatting: Cleans up class attributes on file save.

🚫 Duplicate Removal: Intelligently finds and removes duplicate class names.

🔧 Configurable: Easily enable/disable format-on-save, customize target file types, and define which directories to process.

🎯 Smart Targeting: By default, it focuses on files within a src directory, but you can configure it for any project structure.

⚡ Lightweight & Fast: Built to be fast and efficient with minimal performance impact.

🤝 Broad Support: Works with both className (React) and class (HTML, Vue, Svelte).
What It Does

ClassTrim normalizes your class attributes by:

    Removing leading and trailing whitespace

    Converting multiple consecutive spaces to single spaces

    Deleting any duplicate classes from the list

    Supporting all JSX className formats and standard HTML class

Before and After

Before:

<div className="  container   header  container  button  ">
<span className={'  nav-item   active  '}>
<button class="btn   btn   primary">

After:

<div className="container header button">
<span className={'nav-item active'}>
<button class="btn primary">

Supported File Types

    TypeScript React (.tsx)

    JavaScript React (.jsx)

    HTML (.html)

    Vue (.vue)

    Svelte (.svelte)

    And any other language you configure!

How It Works

    Save Detection: Triggers when you save a file (Ctrl+S / Cmd+S), if enabled.

    File Validation: Checks if the saved file matches your configured language types and path requirements.

    Pattern Matching: Finds all class and className attributes using an efficient regex pattern.

    Normalization: Cleans up whitespace and removes duplicate classes.

    Seamless Application: Applies changes as part of the save operation.

Installation
From VSCode Marketplace

    Open VSCode

    Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)

    Search for "ClassTrim"

    Click "Install"

From VSIX File

    Download the .vsix file

    Open VSCode

    Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)

    Click the "..." menu → "Install from VSIX..."

    Select the downloaded .vsix file

Configuration

You can easily customize ClassTrim to fit your project's needs. Open your settings.json file (Ctrl+Shift+P → Open User Settings (JSON)) and add any of the following options:

Setting

Type

Default

Description

classtrim.formatOnSave

boolean

true

Enable or disable formatting when a file is saved.

classtrim.targetLanguages

string[]

["javascriptreact", "typescriptreact", "html", "vue", "svelte"]

An array of VS Code language identifiers to apply formatting to.

classtrim.requiredPathSegment

string

"src"

A directory name that must be in the file's path. Leave empty ("") to allow any path.
Example Configuration

Here is an example of a custom configuration in your settings.json:

{
"classtrim.formatOnSave": true,
"classtrim.targetLanguages": [
"javascriptreact",
"typescriptreact",
"html",
"vue",
"svelte"
],
"classtrim.requiredPathSegment": "app"
}

Development
Prerequisites

    Node.js 16 or higher

    VSCode 1.92.0 or higher

Setup

# Clone the repository

git clone <repository-url>
cd classtrim

# Install dependencies

npm install

# Open in VSCode

code .

Building

# Compile TypeScript

npm run compile

# Package extension

npm run package

Testing

# Run tests

npm test

# Test in Extension Development Host

# Press F5 in VSCode to launch a new Extension Development Host window

<!-- Contributing

    Fork the repository

    Create a feature branch (git checkout -b feature/amazing-feature)

    Commit your changes (git commit -m 'Add amazing feature')

    Push to the branch (git push origin feature/amazing-feature)

    Open a Pull Request

Roadmap

    [x] HTML class attribute support

    [x] Configuration options

    [ ] CSS class name formatting (e.g., sorting) based on user preference -->

Happy coding with cleaner class attributes! 🎉
