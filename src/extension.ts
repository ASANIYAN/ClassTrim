import * as vscode from "vscode";
import { formatClassNames } from "./formatting/classNameFormatter";
import { isTargetFile } from "./utils/fileUtils";

export function activate(context: vscode.ExtensionContext) {
  // Register the on-save event listener
  const onWillSave = vscode.workspace.onWillSaveTextDocument((event) => {
    // Reads the formatOnSave setting
    const isFormatOnSaveEnabled = vscode.workspace
      .getConfiguration("classtrim")
      .get("formatOnSave", true);
    if (!isFormatOnSaveEnabled) {
      return; // Exit early if the feature is disabled
    }

    const { document } = event;
    const activeEditor = vscode.window.activeTextEditor;

    // Only format if the file is a target file and is currently active in the editor
    if (
      activeEditor &&
      activeEditor.document === document &&
      isTargetFile(document)
    ) {
      // Delegate the formatting logic to the formatter module
      const edits = formatClassNames(document);

      // If there are edits, apply them before the document is saved
      if (edits.length > 0) {
        event.waitUntil(Promise.resolve(edits));
      }
    }
  });

  // Register the manual command to process all open files
  const processAllCommand = vscode.commands.registerCommand(
    "classtrim.trimFiles",
    async () => {
      const workspaceEdit = new vscode.WorkspaceEdit();

      // Iterate over all currently open documents
      for (const document of vscode.workspace.textDocuments) {
        if (isTargetFile(document)) {
          const edits = formatClassNames(document);
          if (edits.length > 0) {
            // Add the edits for this file to the bulk workspace edit
            workspaceEdit.set(document.uri, edits);
          }
        }
      }

      // Apply all collected edits at once
      const success = await vscode.workspace.applyEdit(workspaceEdit);
      if (success) {
        vscode.window.showInformationMessage(
          "ClassName attributes trimmed in all open target files."
        );
      } else {
        vscode.window.showErrorMessage("Failed to trim ClassName attributes.");
      }
    }
  );

  // Add the event listener and command to the extension's subscriptions
  // so they are disposed of when the extension is deactivated.
  context.subscriptions.push(onWillSave, processAllCommand);
}

export function deactivate() {}
