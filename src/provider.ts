import * as vscode from 'vscode';
import path from 'path';
import { generateSchema } from './generator';

export const customScheme = 'zodschemagen';

export class SchemaContentProvider implements vscode.TextDocumentContentProvider {
    onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
    onDidChange = this.onDidChangeEmitter.event;

    provideTextDocumentContent(uri: vscode.Uri): string {
        const [target, isUntitled] = decodeLocation(uri);
        const editor = vscode.window.visibleTextEditors.find(x => x.document.uri.toString() === target.toString() && x.document.isUntitled === isUntitled);
        return editor ? generateSchema(editor.document.getText()) : '';
    }
}

let seq = 0;
export function encodeLocation(uri: vscode.Uri, isUntitled: boolean): vscode.Uri {
    const query = JSON.stringify([uri.toString(), isUntitled]);
    const file = (path.parse(uri.fsPath).name ?? 'preview') + '.ts';

    return vscode.Uri.parse(`${customScheme}:${file}?${query}#${seq++}`);
}

export function decodeLocation(uri: vscode.Uri): [vscode.Uri, boolean] {
    const [target, isUntitled] = <[string, boolean]>JSON.parse(uri.query);
    return [vscode.Uri.parse(target), isUntitled];
}
