import { DestinationController } from '../controllers/destination';
import { Controller, Destinations, NeoAppRoutes } from '../helpers/protocols';
import { SapUi5EndpointFactory } from './sap-ui5-endpoint';
import { SapUi5ResourceFactory } from './sap-ui5-resource';

export class DestinationFactory {
    static assemble(routes: NeoAppRoutes[], destinations: Destinations): Controller {
        const sapUi5ResouceService = SapUi5ResourceFactory.assemble();
        const sapUi5EndpointService = SapUi5EndpointFactory.assemble();
        return new DestinationController(routes, destinations, sapUi5ResouceService, sapUi5EndpointService);
    }
}
