import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "mvp-productivity-tools" is now active!');

  let helloDisposable = vscode.commands.registerCommand('mvp-productivity-tools.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from MVP Productivity Tools!');
  });

  let copyDisposable = vscode.commands.registerCommand('mvp-productivity-tools.copyFileForChatGPT', async (uri?: vscode.Uri, editor?: vscode.TextEditor) => {
    let filePath = '';

    if (uri) {
      filePath = uri.fsPath;
    } else if (editor) {
      filePath = editor.document.uri.fsPath;
    } else if (vscode.window.activeTextEditor) {
      filePath = vscode.window.activeTextEditor.document.uri.fsPath;
    } else {
      vscode.window.showErrorMessage('No file selected.');
      return;
    }

    const fileName = path.basename(filePath);

    try {
      const fileContent = await fs.promises.readFile(filePath, 'utf8');
      const clipboardContent = `Here is [${fileName}]\n\`${fileContent}\``;
      
      await vscode.env.clipboard.writeText(clipboardContent);
      vscode.window.showInformationMessage('File name and content copied to clipboard.');
    } catch (err) {
      vscode.window.showErrorMessage('Failed to copy file name and content to clipboard.');
      console.error(err);
    }
  });

  context.subscriptions.push(helloDisposable, copyDisposable);
}

export function deactivate() {}