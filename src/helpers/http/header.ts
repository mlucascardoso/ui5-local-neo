import { Response } from 'express';
import { Base64 } from 'js-base64';

import defaultHeaders from '../constants/default-headers';
import mappableHeaders from '../constants/mappable-headers';
import { DestinationCredentials } from '../protocols/destinations';
import { HttpHeaders, HttpHeadersKey, HttpHeadersProperty, HttpFullHeaders } from '../protocols/http';

export class HttpHeader {
    static applyDefault(response: Response) {
        for (const header of defaultHeaders) {
            HttpHeader.applyProperty(response, header.name, header.value);
        }
    };

    static applyProperty(response: Response, name: HttpHeadersKey, value: HttpHeadersProperty): void {
        const currentValue = response.get(name);
        if (!currentValue) {
            response.set(name, value);
        } else if (Array.isArray(currentValue)) {
            response.set(name, [...currentValue, value]);
        } else {
            response.set(name, [currentValue, value]);
        }
    }

    static createAuthorization(credentials?: DestinationCredentials): HttpHeaders {
        if (credentials) {
            const authentication = `${credentials.user}:${credentials.password}`;
            const authorization = `Basic ${Base64.encode(authentication)}`;
            return {
                'Authorization': authorization,
            };
        }
        return {};
    }

    static createGenericsFromHeader(httpHeader: HttpHeaders): HttpHeaders {
        const lowerMappable = mappableHeaders.map((header: string) => header.toLowerCase());
        const httpHeaderKeys = Object.keys(httpHeader);
        const mappedHttpHeader: any = {};

        for (const key of httpHeaderKeys) {
            const lowerKey = key.toLowerCase();
            const lowerIndex = lowerMappable.indexOf(lowerKey);
            const propExists = lowerIndex !== -1;

            if (propExists) {
                const propName = mappableHeaders[lowerIndex];
                const propValue = (httpHeader as HttpFullHeaders)[key];
                mappedHttpHeader[propName] = propValue;
            }
        }

        return mappedHttpHeader as HttpHeaders;
    }
}
