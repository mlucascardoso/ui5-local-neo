import path from 'path';

import { DestinationFactory } from './factories/destination';
import { Ui5MiddlewareOptions } from './helpers/protocols';

const createMiddleware = (ui5MiddlewareOptions: Ui5MiddlewareOptions) => {
    const projectPath = ui5MiddlewareOptions.resources.rootProject._readers[0]._project.path;
    const routes = require(path.resolve(projectPath, 'neo-app.json')).routes;
    const destinations = require(path.resolve(projectPath, 'destinations.json'));

    const controller = DestinationFactory.assemble(routes, destinations);

    return controller.handle;
};

module.exports = createMiddleware;
