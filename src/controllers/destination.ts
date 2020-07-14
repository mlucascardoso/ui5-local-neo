import { Request, Response, NextFunction } from 'express';

import { Controller, Destinations, NeoAppRoutes, Resolver, Service } from '../helpers/protocols';

export class DestinationController implements Controller {
    private readonly routes: NeoAppRoutes[];
    private readonly destinations: Destinations;
    private readonly resolvers: Resolver[] = [];
    private readonly sapUi5Service: Service;

    constructor(routes: NeoAppRoutes[], destinations: Destinations, sapUi5Service: Service) {
        this.routes = routes;
        this.destinations = destinations;
        this.sapUi5Service = sapUi5Service;
        this.initRouteResolvers();
    }

    async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const resolver = this.getResolver(request.url);
            if (resolver) {
                await resolver.handle(request, response, this.destinations, this.routes);
            } else {
                next();
                return;
            }
            // const routeProxy = {
            //     proxyConfig: {},
            // };
            // console.log('aq');

            // if (this.sapUi5Service.isUi5Resource(request.url)) {
            //     const endPoint = request.url.split('/resources/')[1];
            //     const url = `/resources/${endPoint}`;
            //     request.url = url;// this.sapUi5Service.getUrl(request);
            //     routeProxy.proxyConfig = { target: 'https://sapui5.hana.ondemand.com', changeOrigin: true };
            // } else {
            //     next();
            //     return;
            // }
            // this.proxyServer.web(request, response, routeProxy.proxyConfig, (err: any) => {
            //     if (err) {
            //         next(err);
            //     }
            // });
        } catch (err) {
            next(err);
        }
    }

    initRouteResolvers() {
        this.resolvers.push({
            '/resources/': this.sapUi5Service,
        });
    }

    getResolver(url: string): Service | undefined {
        for (const resolver of this.resolvers) {
            if (url.includes(Object.keys(resolver)[0])) {
                return resolver[Object.keys(resolver)[0]];
            }
        }
    }
};
