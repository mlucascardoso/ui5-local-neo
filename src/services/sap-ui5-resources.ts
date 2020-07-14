import { Request, Response, NextFunction } from 'express';
import Server, { createProxyServer } from 'http-proxy';

import { Service, Destinations } from '../helpers/protocols';
export class SapUi5ResourcesService implements Service {
    private readonly proxyServer: Server = createProxyServer();

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
        destinations: Destinations,
    ): Promise<void> {
        const endPoint = request.url.split('/resources/')[1];
        request.url = `/resources/${endPoint}`;
        const proxyConfig = { target: destinations.sapui5.uri, changeOrigin: true };

        this.proxyServer.web(request, response, proxyConfig, (err: any) => {
            if (err) {
                next(err);
            }
        });
    }
}
