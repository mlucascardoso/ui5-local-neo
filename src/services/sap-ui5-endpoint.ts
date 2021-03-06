import { Method, AxiosRequestConfig, AxiosError } from 'axios';
import { Request, Response, NextFunction } from 'express';

import { HttpHeader, HttpRequest, HttpResponse } from '../helpers/http';
import {
    Destinations,
    Service,
    NeoAppRoutes,
    DestinationOptions,
    handledStatus,
    handledRequestData,
} from '../helpers/protocols';

export class SapUi5EndpointService implements Service {
    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
        destinations: Destinations,
        routes: NeoAppRoutes[],
    ): Promise<void> {
        const requestedMethod = (request.method as Method);
        const requestedData = request.body;
        const requestedUrl = request.url;

        HttpHeader.applyDefault(response);

        const matchedRoute = this.findMatchedRoute(routes, requestedUrl);
        const routeName = matchedRoute.target.name;
        const destination = destinations[routeName];

        if (!destination) {
            return HttpResponse.bypassEmptyResponse(next);
        }

        const { requestUrl, requestHeaders } = this.getRequestData(
            request,
            destination,
            matchedRoute,
        );

        const requestData = HttpRequest.create({
            url: requestUrl,
            headers: requestHeaders,
            method: requestedMethod,
            data: requestedData,
        });

        const { statusCode, statusText } = await this.getDestinationData(
            response,
            requestData,
        );

        response.status(statusCode).send(statusText);
    }

    private async getDestinationData(response: Response, requestData: AxiosRequestConfig): Promise<handledStatus> {
        try {
            const responseObject = await HttpRequest.send(requestData);
            const responseHeaders = responseObject.headers;
            const statusCode = responseObject.status;
            const statusText = responseObject.data;

            for (const header in responseHeaders) {
                HttpHeader.applyProperty(response, header, responseHeaders[header]);
            }

            return { statusCode, statusText };
        } catch (error) {
            return this.handleError(error);
        }
    }

    private getRequestData(request: Request, destination: DestinationOptions, route: NeoAppRoutes): handledRequestData {
        const requestedUrl = request.url;
        const requestedParams = requestedUrl.split(route.path)[1];
        const requestedHeaders = request.headers;

        const requestUrl = HttpRequest.url(destination.uri, route.target.entryPath, requestedParams);
        const authHeaders = HttpHeader.createAuthorization(destination.credentials);
        const genericHeaders = HttpHeader.createGenericsFromHeader(requestedHeaders);
        const requestHeaders = {
            ...genericHeaders,
            ...authHeaders,
        };

        return {
            requestUrl,
            requestHeaders,
        };
    }

    private handleError(error: Error | AxiosError | any): handledStatus {
        let statusCode = 500;
        let statusText = 'UI5 Internal Error';

        if (error.response.status) {
            statusCode = error.response.status;
            statusText = error.response.statusText;
        };

        return {
            statusCode,
            statusText,
        };
    }

    private findMatchedRoute(routes: NeoAppRoutes[], requestedUrl: string): NeoAppRoutes {
        let matchedRoute = this.initMatchedRoute();
        for (const route of routes) {
            if (requestedUrl.includes(route.path)) {
                if (matchedRoute.path.length < route.path.length) {
                    matchedRoute = route;
                }
            }
        }

        return matchedRoute;
    }

    private initMatchedRoute(): NeoAppRoutes {
        const matchedRoute: NeoAppRoutes = {
            description: '',
            path: '',
            target: {
                entryPath: '',
                name: '',
                type: '',
            },
        };

        return matchedRoute;
    }
}
