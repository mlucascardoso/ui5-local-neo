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
                await resolver.handle(request, response, next, this.destinations, this.routes);
            } else {
                next();
                return;
            }
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
