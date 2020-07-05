import { DestinationController } from '../controllers/destination';
import { Controller, Destinations, NeoAppRoutes } from '../helpers/protocols';

export class DestinationFactory {
    static assemble(routes: NeoAppRoutes[], destinations: Destinations): Controller {
        return new DestinationController(routes, destinations);
    }
}
