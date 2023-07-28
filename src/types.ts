export type ExtensionConfig = {
    quoteStyle: 'single' | 'double';
    logger?: ILogger;
};

export type ILogger = {
    log: (level: 'info' | 'warn' | 'error', msg: string, err?: Error) => void;
};

export class ConsoleLogger implements ILogger {
    log(level: 'info' | 'warn' | 'error', msg: string, err?: Error | undefined): void {
        console[level](msg, err);
    }
}