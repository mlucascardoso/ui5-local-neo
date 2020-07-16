import { Method } from 'axios';
import { Request, Response, NextFunction } from 'express';

import { HttpResponse } from '../helpers/http';
import { Controller, Destinations, NeoAppRoutes, Resolver, Service } from '../helpers/protocols';

export class DestinationController implements Controller {
    private readonly routes: NeoAppRoutes[];
    private readonly destinations: Destinations;
    private readonly resolvers: Resolver[] = [];
    private readonly sapUi5ResourcesService: Service;
    private readonly sapUi5EndpointService: Service;

    constructor(
        routes: NeoAppRoutes[],
        destinations: Destinations,
        sapUi5ResourcesService: Service,
        sapUi5EndpointService: Service,
    ) {
        this.routes = routes;
        this.destinations = destinations;
        this.sapUi5ResourcesService = sapUi5ResourcesService;
        this.sapUi5EndpointService = sapUi5EndpointService;
        this.initRouteResolvers();
        this.initNeoAppRoutes();
    }

    async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const requestedMethod = request.method as Method;
            if (HttpResponse.isBypassableMethod(requestedMethod)) {
                return HttpResponse.bypassOkResponse(response, next);
            }

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
            '/resources/': this.sapUi5ResourcesService,
        });
    }

    initNeoAppRoutes() {
        for (const route of this.routes) {
            if (!route.path.includes('resources')) {
                const resolver: Resolver = {};
                resolver[route.path] = this.sapUi5EndpointService;
                this.resolvers.push(resolver);
            }
        }
    }

    getResolver(url: string): Service | undefined {
        for (const resolver of this.resolvers) {
            if (url.includes(Object.keys(resolver)[0])) {
                return resolver[Object.keys(resolver)[0]];
            }
        }
    }
};
