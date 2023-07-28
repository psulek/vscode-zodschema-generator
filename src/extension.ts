import * as vscode from 'vscode';
import { context } from './context';
import { SchemaContentProvider, customScheme, encodeLocation } from './provider';

export async function activate(ctx: vscode.ExtensionContext) {
    context.init(ctx);

    function showPreview(editor: vscode.TextEditor): void {
        if (editor.document.uri.scheme !== customScheme) {
            const uri = encodeLocation(editor.document.uri, editor.document.isUntitled);
            vscode.workspace.openTextDocument(uri).then(doc => vscode.window.showTextDocument(doc, editor.viewColumn! + 1));        }
    }

    const provider = new SchemaContentProvider();
    
    ctx.subscriptions.push(
        vscode.workspace.registerTextDocumentContentProvider(customScheme, provider),

        vscode.commands.registerTextEditorCommand('zodschemagen.genSchema', showPreview),
        vscode.commands.registerTextEditorCommand('zodschemagen.genSchemaMenu', showPreview)
    );
}

// This method is called when your extension is deactivated
export function deactivate() { }