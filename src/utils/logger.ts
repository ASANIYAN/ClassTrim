import * as vscode from "vscode";

// Create a single, exported logger instance
class Logger {
  private outputChannel: vscode.OutputChannel;

  constructor() {
    // Create the output channel with a specific name
    this.outputChannel = vscode.window.createOutputChannel("ClassTrim");
  }

  public log(message: string): void {
    // Get current time for the timestamp
    const time = new Date().toLocaleTimeString();
    // Append the message to the channel with a timestamp
    this.outputChannel.appendLine(`[${time}] ${message}`);
  }

  public show(): void {
    // Bring the output channel into view
    this.outputChannel.show();
  }
}

export const logger = new Logger();
