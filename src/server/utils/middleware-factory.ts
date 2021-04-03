import { RequestHandler } from 'express';

export type MiddlewareActionFn<Payload = unknown, Response = unknown> = (payload: Payload) => Response;

export function createMiddleware<Payload, Response>(
    actionFn: MiddlewareActionFn<Payload, Response>,
): RequestHandler<unknown, Response, Payload> {
    return (request, response) => {
        try {
            return response.json(actionFn(request.body));
        } catch (error) {
            return response.sendStatus(500);
        }
    };
}
