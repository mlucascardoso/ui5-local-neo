import { Method } from 'Axios';
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
                    const routeHeaders = request.headers;

                    const authHeaders = HttpHeader.createAuthorization(routeCredentials);
                    const genericHeadaers = HttpHeader.createFromObject(routeHeaders);
                    const requestHeaders = {
                        ...genericHeadaers,
                        ...authHeaders,
                    };

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
                    let status = 500;
                    let statusText = 'UI5 Error';

                    if (error.response.status) {
                        status = error.response.status;
                        statusText = error.response.statusText;
                    };

                    response.status(status).send(statusText);
                }
                break;
            }
        }
    }
}
