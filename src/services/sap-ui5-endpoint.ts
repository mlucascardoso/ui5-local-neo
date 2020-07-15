import { Method, AxiosError } from 'Axios';
import { Request, Response, NextFunction } from 'express';

import { HttpHeader } from '../helpers/http/header';
import { HttpRequest } from '../helpers/http/request';
import { HttpResponse } from '../helpers/http/response';
import { Destinations, Service, NeoAppRoutes } from '../helpers/protocols';

export class SapUi5EndpointService implements Service {
    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
        destinations: Destinations,
        routes: NeoAppRoutes[],
    ): Promise<void> {
        const requestMethod = request.method as Method;
        const requestUrl = request.path;

        HttpHeader.applyDefault(response);

        if (HttpResponse.isBypassableMethod(requestMethod)) {
            return HttpResponse.bypassOkResponse(response, next);
        }

        for (const route of routes) {
            if (requestUrl.includes(route.path)) {
                try {
                    const routeName = route.target.name;
                    const routeEntryPath = route.target.entryPath;
                    const routeDestination = destinations[routeName];

                    if (!routeDestination) {
                        return HttpResponse.bypassEmptyResponse(next);
                    }

                    const routeCredentials = routeDestination.credentials;
                    const routeUri = routeDestination.uri;
                    const routeParams = requestUrl.split(route.path)[1];

                    // talvez tenha que aplicar alguns headers do request no request data tbm

                    const requestHeaders = HttpHeader.createAuthorization(routeCredentials);
                    const requestData = HttpRequest.create({
                        url: `${routeUri}${routeEntryPath}${routeParams}`,
                        method: requestMethod,
                        data: request.body,
                        headers: requestHeaders,
                    });

                    const responseObject = await HttpRequest.send(requestData);
                    const responseHeaders = responseObject.headers;

                    for (const header in responseHeaders) {
                        HttpHeader.applyProperty(response, header, responseHeaders[header]);
                    }

                    response.status(responseObject.status).send(responseObject.data);
                } catch (error) {
                    const errorResponse = error.response;
                    const status = errorResponse.status || 500;
                    const statusText = errorResponse.statusText || '';

                    response.status(status).send(statusText);
                }
                break;
            }
        }
    }
}
