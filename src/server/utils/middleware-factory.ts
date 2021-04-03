import { RequestHandler } from 'express';

export type MiddlewareActionFn<Payload = unknown, Response = unknown, Params = unknown> = (payload: Payload, params: Params) => Response;

export function createMiddleware<Payload = unknown, Response = unknown, Params = unknown>(
    actionFn: MiddlewareActionFn<Payload, Response, Params>,
): RequestHandler<Params, Response, Payload> {
    return (request, response) => {
        try {
            return response.json(actionFn(request.body, request.params));
        } catch (error) {
            return response.sendStatus(500);
        }
    };
}
