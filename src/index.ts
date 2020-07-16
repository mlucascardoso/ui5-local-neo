import { Request, Response, NextFunction } from 'express';
import path from 'path';

import { DestinationFactory } from './factories/destination';
import { Ui5MiddlewareOptions } from './helpers/protocols';

const createMiddleware = (ui5MiddlewareOptions: Ui5MiddlewareOptions) => {

    const projectPath = ui5MiddlewareOptions.resources.rootProject._readers[0]._project.path;
    const routes = require(path.resolve(projectPath, 'neo-app.json')).routes;
    const destinations = require(path.resolve(projectPath, 'destinations.json'));
    const controller = DestinationFactory.assemble(routes, destinations);

    return (req: Request, res: Response, next: NextFunction) => {

        // const body: any[] = [];

        // req.on('data', (chunk) => {
        //     console.log(chunk);
        //     body.push(chunk);
        // });

        // req.on('end', () => {
        //     const parsedBody = Buffer.concat(body).toString();
        //     const message = parsedBody.split('=')[1];
        //     console.log(parsedBody);
        //     console.log(message);

        //     controller.handle(req, res, next);
        // });

        const readable = getReadableStreamSomehow();
        readable.on('data', (chunk) => {
            console.log(`Received ${chunk.length} bytes of data.`);
        });
        readable.on('end', () => {
            console.log('There will be no more data.');
        });

        let body: any = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {

            body = Buffer.concat(body).toString();

            console.log('end');
            console.log(body);
            controller.handle(req, res, next);

        });

        // req.on('data', () => {
        //     console.log('data');
        // })

        // req.on('readable', () => {
        //     console.log('readable');
        // })
        // req.on('end', () => {
        //     console.log('end');
        // })

    };
};

module.exports = createMiddleware;
