import * as vscode from "vscode";
import * as path from "path";

function getSetting<T>(key: string): T | undefined {
  return vscode.workspace.getConfiguration("classtrim").get<T>(key);
}

function hasRequiredPathSegment(filePath: string): boolean {
  const requiredSegment = getSetting<string>("requiredPathSegment");
  // If the setting is empty or not set, we allow any path
  if (!requiredSegment) {
    return true;
  }

  const normalizedPath = path.normalize(filePath);
  const dirSegments = path.dirname(normalizedPath).split(path.sep);
  return dirSegments.includes(requiredSegment);
}

export function isTargetFile(document: vscode.TextDocument): boolean {
  const targetLanguages = getSetting<string[]>("targetLanguages") || [];
  const targetLanguageSet = new Set(targetLanguages);

  const isLanguageMatch = targetLanguageSet.has(document.languageId);
  const isPathMatch = hasRequiredPathSegment(document.fileName);

  // if (isLanguageMatch && !isPathMatch) {
  //   logger.log(
  //     `Skipping ${document.fileName}: Language matches, but not in required path.`
  //   );
  // }

  return isLanguageMatch && isPathMatch;
}
