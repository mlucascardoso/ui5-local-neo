import { HttpMethods } from '../../enums/http-methods';
import { HttpHeader } from './header';

export interface HttpRequest {
    data?: any
    headers?: HttpHeader[]
    method: HttpMethods
    url: string
};
