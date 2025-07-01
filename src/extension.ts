// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path from "path";
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const targetLanguages = new Set([
    // "html",
    "javascriptreact",
    "typescriptreact",
  ]);

  function hasSrcInFilePath(filePath: string): boolean {
    const normalizedPath = path.normalize(filePath);
    const pathSegments = normalizedPath.split(path.sep);
    const lastSegment = pathSegments[pathSegments.length - 1];
    const isFile = lastSegment.includes(".");
    const parentSegments = isFile ? pathSegments.slice(0, -1) : pathSegments;
    return parentSegments.includes("src");
  }

  function isTargetFile(document: vscode.TextDocument): boolean {
    // Check both language type and file path requirements
    return (
      targetLanguages.has(document.languageId) &&
      hasSrcInFilePath(document.fileName)
    );
  }

  function formatClassNames(content: string): vscode.TextEdit[] {
    const edits: vscode.TextEdit[] = [];

    // Option 2: Separate patterns for different className formats

    // For direct quotes: className="..." or className='...'
    const directQuotes = /className=(['"])([^'"]*?)\1/g;

    // For braces: className={"..."} or className={'...'}
    const bracesQuotes = /className=\{(['"])([^'"]*?)\1\}/g;

    // For template literals: className={`...`}
    const templateLiterals = /className=\{`([^`]*?)`\}/g;

    // Helper function to normalize class string spacing
    function normalizeClassString(classString: string): string {
      return classString.trim().replace(/\s+/g, " ");
    }

    // Helper function to convert string index to VSCode Position
    function indexToPosition(content: string, index: number): vscode.Position {
      const lines = content.substring(0, index).split("\n");
      const line = lines.length - 1;
      const character = lines[lines.length - 1].length;
      return new vscode.Position(line, character);
    }

    console.log("=== Processing className values ===");

    // Process direct quotes (className="..." or className='...')
    let match;
    while ((match = directQuotes.exec(content)) !== null) {
      const fullMatch = match[0]; // Full matched string: className="..."
      const quoteType = match[1]; // Quote character: " or '
      const classContent = match[2]; // Content inside quotes
      const matchIndex = match.index!; // Start position of full match

      // Normalize the class content
      const normalizedContent = normalizeClassString(classContent);

      // Only create edit if content actually changed
      if (normalizedContent !== classContent) {
        // Calculate the position of the content inside the quotes
        // matchIndex + "className=".length + quoteType.length = start of content
        const contentStartIndex = matchIndex + "className=".length + 1;
        const contentEndIndex = contentStartIndex + classContent.length;

        // Convert string positions to VSCode Positions
        const startPosition = indexToPosition(content, contentStartIndex);
        const endPosition = indexToPosition(content, contentEndIndex);

        // Create range and TextEdit
        const range = new vscode.Range(startPosition, endPosition);
        const edit = new vscode.TextEdit(range, normalizedContent);

        edits.push(edit);

        console.log(`Direct Quote - Original: "${classContent}"`);
        console.log(`Direct Quote - Normalized: "${normalizedContent}"`);
      }
    }

    // Reset regex lastIndex for next pattern
    directQuotes.lastIndex = 0;

    // Process braces with quotes (className={"..."} or className={'...'})
    while ((match = bracesQuotes.exec(content)) !== null) {
      const fullMatch = match[0]; // Full matched string: className={"..."}
      const quoteType = match[1]; // Quote character: " or '
      const classContent = match[2]; // Content inside quotes
      const matchIndex = match.index!; // Start position of full match

      // Normalize the class content
      const normalizedContent = normalizeClassString(classContent);

      // Only create edit if content actually changed
      if (normalizedContent !== classContent) {
        // Calculate the position of the content inside the quotes
        // matchIndex + "className={".length + quoteType.length = start of content
        const contentStartIndex = matchIndex + "className={".length + 1;
        const contentEndIndex = contentStartIndex + classContent.length;

        // Convert string positions to VSCode Positions
        const startPosition = indexToPosition(content, contentStartIndex);
        const endPosition = indexToPosition(content, contentEndIndex);

        // Create range and TextEdit
        const range = new vscode.Range(startPosition, endPosition);
        const edit = new vscode.TextEdit(range, normalizedContent);

        edits.push(edit);

        console.log(`Braces Quote - Original: "${classContent}"`);
        console.log(`Braces Quote - Normalized: "${normalizedContent}"`);
      }
    }

    // Reset regex lastIndex for next pattern
    bracesQuotes.lastIndex = 0;

    // Process template literals (className={`...`})
    while ((match = templateLiterals.exec(content)) !== null) {
      const fullMatch = match[0]; // Full matched string: className={`...`}
      const classContent = match[1]; // Content inside backticks
      const matchIndex = match.index!; // Start position of full match

      // Normalize the class content
      const normalizedContent = normalizeClassString(classContent);

      // Only create edit if content actually changed
      if (normalizedContent !== classContent) {
        // Calculate the position of the content inside the backticks
        // matchIndex + "className={`".length = start of content
        const contentStartIndex = matchIndex + "className={`".length;
        const contentEndIndex = contentStartIndex + classContent.length;

        // Convert string positions to VSCode Positions
        const startPosition = indexToPosition(content, contentStartIndex);
        const endPosition = indexToPosition(content, contentEndIndex);

        // Create range and TextEdit
        const range = new vscode.Range(startPosition, endPosition);
        const edit = new vscode.TextEdit(range, normalizedContent);

        edits.push(edit);

        console.log(`Template Literal - Original: "${classContent}"`);
        console.log(`Template Literal - Normalized: "${normalizedContent}"`);
      }
    }

    // Reset regex lastIndex
    templateLiterals.lastIndex = 0;

    console.log(`=== Created ${edits.length} text edits ===`);

    return edits;
  }

  const onWillSave = vscode.workspace.onWillSaveTextDocument((event) => {
    // Check if the document being saved is the currently active one
    const activeEditor = vscode.window.activeTextEditor;

    // Only process if:
    // 1. There's an active editor
    // 2. The document being saved is the active document
    // 3. The document matches our target criteria
    if (
      activeEditor &&
      activeEditor.document === event.document &&
      isTargetFile(event.document)
    ) {
      console.log(`Formatting active file: ${event.document.fileName}`);

      // Get current content
      const content = event.document.getText();

      // console.log(content, "file content");

      // Generate formatting edits
      const edits = formatClassNames(content);

      // Apply edits before save completes (Prettier-style behavior)
      if (edits.length > 0) {
        event.waitUntil(Promise.resolve(edits));
      }
    }
  });

  // Keep the manual command for processing all files if needed
  function processAllOpenFiles(): void {
    vscode.workspace.textDocuments.forEach((document) => {
      if (isTargetFile(document)) {
        console.log(
          `File: ${document.fileName}, Content length: ${
            document.getText().length
          }`
        );
        // Manual processing logic here if needed
      }
    });
  }

  const processCommand = vscode.commands.registerCommand(
    "classtrim.trimFiles",
    processAllOpenFiles
  );

  context.subscriptions.push(onWillSave);
}

// This method is called when your extension is deactivated
export function deactivate() {}
