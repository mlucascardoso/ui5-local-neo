import { Method } from 'axios';

export type HttpHeadersProperty = string;

export type HttpHeadersKey = string;

export type HeadersEmptyObject = {};

export type HttpHeaders = HttpFullHeaders | HeadersEmptyObject;

export interface HttpFullHeaders {
    [attr: string]: HttpHeadersProperty;
}

export interface HttpRequestData {
    url: string;
    method: Method;
    headers?: HttpHeaders;
    data?: any;
}
