import * as vscode from 'vscode';
import * as path from 'path';
import { ExtensionConfig, ILogger } from './types';

const supportedExtensions = ['.ts', '.mts', '.tsx', '.mtsx'];

const configKeys = {
    quoteStyle: 'zodschemagenerator.quotes',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    quoteStyle_ts: 'typescript.preferences.quoteStyle'
};

export class Context implements ILogger {
    private ctx!: vscode.ExtensionContext;
    private logger!: ILogger;

    init(ctx: vscode.ExtensionContext, logger?: ILogger): void {
        this.ctx = ctx;
        this.logger = logger ?? new VsCodeLogger();
        this.log('info', `Zod schema generator initialized.`);
    }

    get vsContext(): vscode.ExtensionContext {
        return this.ctx;
    }

    log(level: 'info' | 'warn' | 'error', msg: string, err?: Error | undefined): void {
        this.logger.log(level, msg, err);
    }

    getConfig(): ExtensionConfig {
        const cfg = vscode.workspace.getConfiguration();
        let quoteStyle = cfg.get(configKeys.quoteStyle) as string;
        if (quoteStyle === 'auto') {
            quoteStyle = cfg.get(configKeys.quoteStyle_ts) as string;
        }

        return {
            quoteStyle: quoteStyle === 'single' ? 'single' : 'double'
        };
    }
}

let vsCodeLoggerPanel: vscode.OutputChannel | undefined;

export const outputPaneName = 'Zod Schema Generator';

export class VsCodeLogger implements ILogger {
    log(level: 'info' | 'warn' | 'error', msg: string, err?: Error | undefined): void {
        if (!vsCodeLoggerPanel) {
            vsCodeLoggerPanel = vscode.window.createOutputChannel(outputPaneName);
        }

        vsCodeLoggerPanel.appendLine(`[${level}] ${msg}` + (err ? `[${err.name}] ${err.message} ${err.stack}` : ''));
    }
}

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