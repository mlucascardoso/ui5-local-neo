import { Request, Response, NextFunction } from 'express';

import { Controller, Destinations, NeoAppRoutes } from '../helpers/protocols';
import { SapUi5ResourcesService } from '../services/sap-ui5-resources';

export class DestinationController implements Controller {
    private readonly routes: NeoAppRoutes[];
    private readonly destinations: Destinations;
    private readonly sapUi5Service: SapUi5ResourcesService;

    constructor(routes: NeoAppRoutes[], destinations: Destinations, sapUi5Service: SapUi5ResourcesService) {
        this.routes = routes;
        this.destinations = destinations;
        this.sapUi5Service = sapUi5Service;
    }

    async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            console.log(this.sapUi5Service.isUi5Resource(request.url));
            next();
        } catch (err) {
            next(err);
        }
    }
};
