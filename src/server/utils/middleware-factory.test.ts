import { Request, Response } from 'express';
import {
    createMiddleware, MiddlewareActionFn,
} from './middleware-factory';

function createAndCallMiddleware<Payload, ResponsePayload>(
    actionFn: MiddlewareActionFn<Payload, ResponsePayload>,
    request: Partial<Request>,
    response: Partial<Response>,
) {
    const middleware = createMiddleware(actionFn);

    middleware(request as Request, response as Response, jest.fn());
}

describe('Middlware factory', () => {
    it('should respond with actionFunction return result as json', () => {
        const ACTION_FN_RESULT = { hello: '1' };
        const actionFn: MiddlewareActionFn<unknown, typeof ACTION_FN_RESULT> = () => ACTION_FN_RESULT;
        const responseMock = { json: jest.fn() } as Partial<Response>;

        createAndCallMiddleware(
            actionFn,
            {},
            responseMock,
        );

        expect(responseMock.json).toHaveBeenCalledWith(ACTION_FN_RESULT);
    });

    it('should respond with statusCode = 500 given action function throwing error', () => {
        const actionFn: MiddlewareActionFn = () => { throw new Error(); };
        const responseMock = { sendStatus: jest.fn() } as Partial<Response>;

        createAndCallMiddleware(
            actionFn,
            {},
            responseMock,
        );

        expect(responseMock.sendStatus).toHaveBeenCalledWith(500);
    });

    it('should pass request payload to action function', () => {
        const PAYLOAD = { hello: '1' };
        const actionFn: MiddlewareActionFn = jest.fn();
        const responseMock = { json: jest.fn() } as Partial<Response>;

        createAndCallMiddleware(
            actionFn,
            { body: PAYLOAD },
            responseMock,
        );

        expect(actionFn).toHaveBeenCalledWith(PAYLOAD, undefined);
    });

    it('should pass request params to action function', () => {
        const PARAMS = { id: '1' };
        const actionFn: MiddlewareActionFn = jest.fn();
        const responseMock = { json: jest.fn() } as Partial<Response>;

        createAndCallMiddleware(
            actionFn,
            { params: PARAMS, body: null },
            responseMock,
        );

        expect(actionFn).toHaveBeenCalledWith(null, PARAMS);
    });
});
