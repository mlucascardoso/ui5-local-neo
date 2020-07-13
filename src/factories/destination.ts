import { DestinationController } from '../controllers/destination';
import { Controller, Destinations, NeoAppRoutes } from '../helpers/protocols';
import { SapUi5ResourceFactory } from './sap-ui5-resource';

export class DestinationFactory {
    static assemble(routes: NeoAppRoutes[], destinations: Destinations): Controller {
        const sapUi5Service = SapUi5ResourceFactory.assemble();
        return new DestinationController(routes, destinations, sapUi5Service);
    }
}
