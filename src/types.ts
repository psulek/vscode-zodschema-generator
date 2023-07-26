export type ExtensionConfig = {
    logging?: boolean;
    logger?: ILogger;
};

export type PostMessage = {
    command: 'update';
    isEmpty: boolean;
    file: string;
    line: number;
    isUntitled: boolean;
};

export type ILogger = {
    log: (level: 'info' | 'warn' | 'error', msg: string, err?: Error) => void;
};

export class ConsoleLogger implements ILogger {
    log(level: 'info' | 'warn' | 'error', msg: string, err?: Error | undefined): void {
        console[level](msg, err);
    }
}