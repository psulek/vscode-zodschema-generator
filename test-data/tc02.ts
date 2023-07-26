export interface HttpClientResponse<T = unknown> {
    data?: T;
    status?: number;
    statusText?: string;
    headers?: { [key: string]: unknown };
}