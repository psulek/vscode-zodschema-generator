import * as vscode from 'vscode';
import * as path from 'path';
import { ExtensionConfig, ILogger } from './types';

export type VsCodeTheme = 'light' | 'dark';
export const webViewPanelType = 'typedocPreview';
const supportedExtensions = ['.ts', '.mts', '.tsx', '.mtsx'];

const configKeys = {
    
};

export class Context {
    private ctx!: vscode.ExtensionContext;
    private _tsLibraryFiles: string[] = [];
    private contextInitialized = false;
    private activeTheme: VsCodeTheme = 'light';
    private logger!: ILogger;

    init(ctx: vscode.ExtensionContext, logger?: ILogger): void {
        this.ctx = ctx;
        this.logger = logger ?? new VsCodeLogger();
        this.setTheme(vscode.window.activeColorTheme.kind);

        (async () => {
            try {
                // NOTE: here place some async init function call when required
            } finally {
                this.contextInitialized = true;
            }
        })();
    }

    get tsLibraryFiles(): string[] {
        return this._tsLibraryFiles;
    }

    get vsContext(): vscode.ExtensionContext {
        return this.ctx;
    }

    get contextIsInitialized(): boolean {
        return this.contextInitialized;
    }

    waitForInit(): Promise<void> {
        return this.contextInitialized ? Promise.resolve() : new Promise(resolve => {
            const end = Date.now() + (10 * 1000);
            let ref: NodeJS.Timer | undefined = setInterval(() => {
                if (ref && (this.contextInitialized || (Date.now() >= end))) {
                    clearInterval(ref);
                    ref = undefined;
                    resolve();
                }
            }, 10);
        });
    }

    setTheme(vsThemeKind: vscode.ColorThemeKind): void {
        this.activeTheme = vsThemeKind === vscode.ColorThemeKind.Dark ? 'dark' : 'light';
    }

    getUri = (relativePath: string): vscode.Uri =>
        vscode.Uri.joinPath(this.ctx.extensionUri, relativePath);

    getMediaUri = (webview: vscode.Webview, filename: string, themed: boolean): vscode.Uri => {
        const diskPath = themed
            ? vscode.Uri.joinPath(this.ctx.extensionUri, 'media', this.activeTheme, filename)
            : vscode.Uri.joinPath(this.ctx.extensionUri, 'media', filename);
        return webview.asWebviewUri(diskPath);
    };

    getConfig(): ExtensionConfig {
        //const cfg = vscode.workspace.getConfiguration();
        //const emptySignatures = cfg.get(configKeys.emptySignatures) as string;
        return {
            //hideEmptySignatures: emptySignatures === EmptySignaturesTypes.hide
        };
    }

    /* async updateConfig(newConfig: ExtensionConfig) {
        const emptySignatures = newConfig.hideEmptySignatures ? EmptySignaturesTypes.hide : EmptySignaturesTypes.show;
        await vscode.workspace.getConfiguration().update(configKeys.emptySignatures, emptySignatures, vscode.ConfigurationTarget.Global);
    } */
}

let vsCodeLoggerPanel: vscode.OutputChannel | undefined;

export class VsCodeLogger implements ILogger {
    log(level: 'info' | 'warn' | 'error', msg: string, err?: Error | undefined): void {
        if (!vsCodeLoggerPanel) {
            vsCodeLoggerPanel = vscode.window.createOutputChannel('TypeDoc Live Preview');
        }

        vsCodeLoggerPanel.appendLine(`[${level}] ${msg}` + (err ? `[${err.name}] ${err.message} ${err.stack}` : ''));
    }
}

//export const vsCodeLogger = new VsCodeLogger();

export function isTypescriptFile(uriOrDocument: vscode.Uri | vscode.TextDocument): boolean {
    let uri: vscode.Uri;
    const isUri = uriOrDocument instanceof vscode.Uri;
    if ('uri' in uriOrDocument) {
        uri = uriOrDocument.uri;
    } else {
        uri = uriOrDocument;
    }

    let supported = uri ? supportedExtensions.includes(path.extname(uri.fsPath)) : false;
    if (!supported && !isUri) {
        supported = uriOrDocument.languageId === 'typescript';
    }

    return supported;
}

export const context = new Context();