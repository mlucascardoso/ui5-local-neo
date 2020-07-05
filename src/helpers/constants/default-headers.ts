import { HttpHeaderName } from '../enums/http-header-name';
import allowedHeaders from './allowed-headers';

export default [
    {
        name: HttpHeaderName.ACCESS_CONTROL_ALLOW_ORIGIN,
        value: '*',
    },
    {
        name: HttpHeaderName.ACCESS_CONTROL_ALLOW_CREDENTIALS,
        value: 'true',
    },
    {
        name: HttpHeaderName.ACCESS_CONTROL_ALLOW_METHODS,
        value: 'GET,PUT,POST,DELETE',
    },
    {
        name: HttpHeaderName.ACCESS_CONTROL_ALLOW_HEADERS,
        value: allowedHeaders.join(','),
    },
];
