import { Request, Response, NextFunction } from 'express';

import { applyCustomHeader } from '../helpers/http/header';
import { Controller, Destinations, NeoAppRoutes, HttpHeader } from '../helpers/protocols';
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
            if (this.sapUi5Service.isUi5Resource(request.url)) {
                const result = await this.sapUi5Service.handle(request, this.destinations.sapui5.uri);

                for (const key in result.headers) {
                    const header: HttpHeader = {
                        name: key,
                        value: result.headers[key],
                    };

                    applyCustomHeader(response, header);
                }

                response.status(200).send(result.data);
            } else {

            }

            next();
        } catch (err) {
            next(err);
        }
    }
};
