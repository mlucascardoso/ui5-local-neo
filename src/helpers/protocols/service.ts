import { Request, Response } from 'express';

import { Destinations } from './destinations';
import { NeoAppRoutes } from './neo-app';

export interface Service<T = any> {
    handle: (request: Request, response: Response, destinations: Destinations, routes: NeoAppRoutes[]) => Promise<T>
}
