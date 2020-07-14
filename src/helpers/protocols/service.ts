import { Request, Response, NextFunction } from 'express';

import { Destinations } from './destinations';
import { NeoAppRoutes } from './neo-app';

export interface Service<T = any> {
    handle: (request: Request, response: Response, next: NextFunction, destinations: Destinations, routes: NeoAppRoutes[]) => Promise<T>
}
