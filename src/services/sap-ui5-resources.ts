import { AxiosResponse } from 'axios';
import { Request } from 'express';

import { createGetRequest, sendRequest } from '../helpers/http/request';

export class SapUi5ResourcesService {
    async handle(request: Request, destinationUri: string): Promise<AxiosResponse> {
        const endPoint = request.url.split('/resources/')[1];
        const url = `${destinationUri}/${endPoint}`;

        const req = createGetRequest(url, []);
        const response = await sendRequest(req);

        return response;
    }

    isUi5Resource(url: string): boolean {
        return url.includes('/resources/');
    }
}
