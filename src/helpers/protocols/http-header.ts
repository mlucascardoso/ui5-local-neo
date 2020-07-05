import { HttpHeaderName } from '../enums/http-header-name';

export interface HttpHeader {
    name?: HttpHeaderName
    value?: string
}
