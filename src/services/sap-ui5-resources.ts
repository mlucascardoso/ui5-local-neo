import { Request, Response } from 'express';

import { Service, Destinations, NeoAppRoutes } from '../helpers/protocols';
export class SapUi5ResourcesService implements Service {
    private readonly proxyServer: any;

    async handle(
        request: Request,
        response: Response,
        destinations: Destinations,
        routes: NeoAppRoutes[],
    ): Promise<void> {
        console.log(request, response, destinations, routes);

        //     const endPoint = request.url.split('/resources/')[1];
        //     const url = `/resources/${endPoint}`;
        //     request.url = url;// this.sapUi5Service.getUrl(request);
        //     routeProxy.proxyConfig = { target: 'https://sapui5.hana.ondemand.com', changeOrigin: true };
    }
}
