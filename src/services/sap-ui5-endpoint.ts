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
        const requestedMethod = request.method as Method;
        const requestedUrl = request.url;

        HttpHeader.applyDefault(response);

        if (HttpResponse.isBypassableMethod(requestedMethod)) {
            return HttpResponse.bypassOkResponse(response, next);
        }

        for (const route of routes) {
            if (requestedUrl.includes(route.path)) {
                try {
                    const routeName = route.target.name;
                    const routeEntryPath = route.target.entryPath;
                    const routeDestination = destinations[routeName];

                    if (!routeDestination) {
                        return HttpResponse.bypassEmptyResponse(next);
                    }

                    const routeCredentials = routeDestination.credentials;
                    const routeUri = routeDestination.uri;
                    const routeParams = requestedUrl.split(route.path)[1];
                    const routeHeaders = request.headers;

                    const requestUrl = HttpRequest.url(routeUri, routeEntryPath, routeParams);
                    const authHeaders = HttpHeader.createAuthorization(routeCredentials);
                    const genericHeaders = HttpHeader.createGenericsFromHeader(routeHeaders);
                    const requestHeaders = {
                        ...genericHeaders,
                        ...authHeaders,
                    };

                    console.log('================');
                    console.log(request.url);
                    console.log(requestHeaders);

                    const requestData = HttpRequest.create({
                        url: requestUrl,
                        method: requestedMethod,
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
