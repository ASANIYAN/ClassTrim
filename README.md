# ClassTrim

A lightweight VSCode extension that automatically cleans up `className` attributes by removing extra whitespace and normalizing spacing in React/JSX files.

## Features

✨ **Automatic Formatting**: Formats `className` attributes on file save (Prettier-style behavior)  
🎯 **Smart Targeting**: Only processes the currently active file  
📁 **Source Directory Focus**: Works exclusively on files within `src` directories  
⚡ **Lightweight**: Fast and efficient with minimal performance impact  
🔧 **Zero Configuration**: Works out of the box, no setup required

## What It Does

ClassTrim normalizes `className` attribute spacing by:

- **Removing leading and trailing whitespace**
- **Converting multiple consecutive spaces to single spaces**
- **Supporting all JSX className formats**

### Before and After

**Before:**

```jsx
<div className="  container   header   button  ">
<span className={'  nav-item   active  '}>
<button className={`  btn   primary   large  `}>
```

**After:**

```jsx
<div className="container header button">
<span className={'nav-item active'}>
<button className={`btn primary large`}>
```

## Supported File Types

- **TypeScript React** (`.tsx`)
- **JavaScript React** (`.jsx`)

## How It Works

1. **Save Detection**: Automatically triggers when you save a file (`Ctrl+S` / `Cmd+S`)
2. **File Validation**: Checks if the saved file is:
   - Currently active in the editor
   - A supported file type (`.tsx` or `.jsx`)
   - Located within a `src` directory
3. **Pattern Matching**: Finds all `className` attributes using regex patterns
4. **Whitespace Normalization**: Cleans up spacing issues
5. **Seamless Application**: Applies changes as part of the save operation

## Installation

### From VSCode Marketplace

1. Open VSCode
2. Go to Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "ClassTrim"
4. Click "Install"

### From VSIX File

1. Download the `.vsix` file
2. Open VSCode
3. Go to Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
4. Click the "..." menu → "Install from VSIX..."
5. Select the downloaded `.vsix` file

## Requirements

- **VSCode Version**: 1.92.0 or higher
- **File Location**: Files must be within a `src` directory
- **File Types**: Only `.tsx` and `.jsx` files are processed

## Usage

No setup required! ClassTrim works automatically:

1. Open a React/JSX file in your `src` directory
2. Edit your `className` attributes
3. Save the file (`Ctrl+S` / `Cmd+S`)
4. ClassTrim automatically cleans up the spacing

## Configuration

ClassTrim currently requires no configuration and works with sensible defaults. All `className` attributes in supported files are automatically processed on save.

## Development

### Prerequisites

- Node.js 16 or higher
- VSCode 1.92.0 or higher

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd classtrim

# Install dependencies
npm install

# Open in VSCode
code .
```

### Building

```bash
# Compile TypeScript
npm run compile

# Package extension
npm run package
```

### Testing

```bash
# Run tests
npm test

# Test in Extension Development Host
# Press F5 in VSCode to launch a new Extension Development Host window
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Known Issues

- Currently only supports files within `src` directories
- Only processes `.tsx` and `.jsx` files (HTML support planned)

## Roadmap

- [ ] HTML `class` attribute support (🚧 in progress)
- [ ] CSS class name formatting
- [ ] Configuration options for custom spacing rules
- [ ] Support for files outside `src` directories

---

**Happy coding with cleaner className attributes!** 🎉
