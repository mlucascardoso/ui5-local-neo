import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { HttpMethods } from '../enums/http-methods';
import { HttpRequest, HttpHeader } from '../protocols';

export const createPostRequest = (data: any, url: string, headers: HttpHeader[]): HttpRequest => {
    return {
        data,
        headers,
        method: HttpMethods.post,
        url,
    };
};

export const createGetRequest = (url: string, headers: HttpHeader[]): HttpRequest => {
    return {
        headers,
        method: HttpMethods.get,
        url,
    };
};

export const sendRequest = async (request: HttpRequest): Promise<AxiosResponse> => {
    const req: AxiosRequestConfig = {
        method: request.method,
        url: request.url,
    };

    if (request.data) {
        req['data'] = request.data;
    }

    if (request.headers) {
        req['headers'] = request.headers.map((header: HttpHeader) => ({ [header.name]: header.value }));
    }
    const response = await axios(req);

    return response;
};
