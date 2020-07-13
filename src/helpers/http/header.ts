import { Response } from 'express';
import { Base64 } from 'js-base64';

import defaultHeaders from '../constants/default-headers';
import { HttpHeaderName } from '../enums/http-header-name';
import { HttpHeader, Destinations } from '../protocols';

const applyDefaultHeaders = (response: Response) => {
    for (const header of defaultHeaders) {
        applyCustomHeader(response, header);
    }
};

const applyCustomHeader = (response: Response, header: HttpHeader) => {
    const currentValue = response.get(header.name);
    if (!currentValue) {
        response.set(header.name, header.value);
    } else if (Array.isArray(currentValue)) {
        response.set(header.name, [...currentValue, header.value]);
    } else {
        response.set(header.name, [currentValue, header.value]);
    }
};

const createAuthorizationHeader = (destinations: Destinations, routeName: string): HttpHeader | {} => {
    const credentials = destinations[routeName].credentials;
    if (credentials) {
        const authorization = Base64.encode(`${credentials.user}:${credentials.password}`);
        const authHeader: HttpHeader = {
            name: HttpHeaderName.AUTHORIZATION,
            value: `Basic ${authorization}`,

        };

        return authHeader;
    }

    return {};
};

export {
    applyCustomHeader,
    applyDefaultHeaders,
    createAuthorizationHeader,
};
