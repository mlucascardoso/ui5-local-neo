import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { HttpRequestData } from '../protocols/http';

export class HttpRequest {
    static url(base: string, route: string = '', params: string = '') {
        return decodeURI(`${base}${route}${params}`);
    }

    static create(data: HttpRequestData): AxiosRequestConfig {
        return {
            url: data.url,
            method: data.method,
            headers: data.headers || {},
            data: data.data || {},
        };
    }

    static async send(request: AxiosRequestConfig): Promise<AxiosResponse> {
        const response = await axios(request);
        return response;
    }
}
