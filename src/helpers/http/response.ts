import { Method } from 'axios';
import { Response, NextFunction } from 'express';

export class HttpResponse {
    static isBypassableMethod(method: Method): boolean {
        return method === 'OPTIONS';
    }

    static bypassOkResponse(response: Response, next: NextFunction): void {
        response.status(200);
        next();
    }

    static bypassEmptyResponse(next: NextFunction): void {
        next();
    }
}
