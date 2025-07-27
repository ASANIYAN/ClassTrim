import * as vscode from "vscode";

/**
 * A single, powerful regular expression to find all types of class attributes.
 * It uses named capture groups for readability and handles different quote types.
 *
 * Breakdown:
 * - `(?:className|class)=` : Matches either the literal text "className=" OR "class=".
 * - `(?: ... )`            : A non-capturing group to hold all possible value formats.
 * - `{(?<template>`...`)}`   : Matches template literals inside braces, e.g., className={`...`}
 * - `{(?<s_brace>'[^']*')}`  : Matches single-quoted strings inside braces, e.g., className={'...'}
 * - `{(?<d_brace>"[^"]*")}`  : Matches double-quoted strings inside braces, e.g., className={"..."}
 * - `(?<s_quote>'[^']*')`   : Matches single-quoted strings directly, e.g., className='...'
 * - `(?<d_quote>"[^"]*")`   : Matches double-quoted strings directly, e.g., className="..."
 */

const CLASSNAME_REGEX =
  /(?:className|class)=(?:{(?<template>`[^`]*`|'(?<s_brace>[^']*)'|"(?<d_brace>[^"]*)")|(?<s_quote>'[^']*')|(?<d_quote>"[^"]*"))/g;

/**
 * Normalizes a string of class names.
 * Removes duplicate classes.
 * @param classString The raw string of class names.
 * @returns A normalized string with unique classes.
 */
function normalizeClassString(classString: string): string {
  const trimmed = classString.trim().replace(/\s+/g, " ");
  if (!trimmed) {
    return "";
  }
  // Split into an array, create a Set to get unique values, then join back
  const uniqueClasses = [...new Set(trimmed.split(" "))];
  return uniqueClasses.join(" ");
}

/**
 * Analyzes a document and generates an array of TextEdits for formatting className attributes.
 * @param document The VS Code TextDocument to process.
 * @returns An array of vscode.TextEdit objects.
 */
export function formatClassNames(
  document: vscode.TextDocument
): vscode.TextEdit[] {
  const content = document.getText();
  const edits: vscode.TextEdit[] = [];

  let match;
  // Loop through all matches of the regex in the document
  while ((match = CLASSNAME_REGEX.exec(content)) !== null) {
    // Extract the content from the first matching named capture group
    const classContentWithQuotes =
      match.groups?.template ||
      match.groups?.s_brace ||
      match.groups?.d_brace ||
      match.groups?.s_quote ||
      match.groups?.d_quote;

    if (!classContentWithQuotes) {
      continue;
    }

    // CRITICAL: If the content includes a template literal expression, skip it
    // to avoid breaking the code. This is an important guard.
    if (classContentWithQuotes.includes("${")) {
      continue;
    }

    // Remove the surrounding quotes/backticks to get the raw class string
    const classContent = classContentWithQuotes.slice(1, -1);
    const normalizedContent = normalizeClassString(classContent);

    // Only create an edit if the content actually needs to be changed
    if (normalizedContent !== classContent) {
      // Find the start index of the content within the document.
      // We search for the content starting from the beginning of the full regex match.
      const contentStartIndex = content.indexOf(classContent, match.index);
      const contentEndIndex = contentStartIndex + classContent.length;

      // Use the document's optimized positionAt method to convert string indices to Position objects
      const startPosition = document.positionAt(contentStartIndex);
      const endPosition = document.positionAt(contentEndIndex);

      const range = new vscode.Range(startPosition, endPosition);
      edits.push(new vscode.TextEdit(range, normalizedContent));
    }
  }

  return edits;
}
