import { Request, Response, NextFunction } from 'express';

import { Controller, Destinations, NeoAppRoutes } from '../helpers/protocols';

export class DestinationController implements Controller {
    private readonly routes: NeoAppRoutes[];
    private readonly destinations: Destinations;

    constructor(routes: NeoAppRoutes[], destinations: Destinations) {
        this.routes = routes;
        this.destinations = destinations;
    }

    async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            console.log(request.url);
            next();
        } catch (err) {
            next(err);
        }
    }
};
