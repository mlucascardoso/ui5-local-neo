import { HttpHeaders } from './http';

export type handledStatusCode = number;

export type handledStatusText = any;

export interface handledStatus {
    statusCode: handledStatusCode;
    statusText: handledStatusText;
}

export interface handledRequestData {
    requestUrl: string,
    requestHeaders: HttpHeaders
}
