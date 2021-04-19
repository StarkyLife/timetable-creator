import { Request, Response } from 'express';
import {
    createMiddleware,
    MiddlewareActionFn,
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
    it('should respond with json given actionFn returning data', () => {
        const ACTION_FN_RETURN = { data: 'actionFn' };
        const PARAMS = { id: '1' };
        const PAYLOAD = { hello: '1' };
        const actionFn: MiddlewareActionFn = jest.fn(() => ACTION_FN_RETURN);
        const responseMock = { json: jest.fn() } as Partial<Response>;

        createAndCallMiddleware(
            actionFn,
            { params: PARAMS, body: PAYLOAD },
            responseMock,
        );

        expect(responseMock.json).toHaveBeenCalledWith(ACTION_FN_RETURN);
        expect(actionFn).toHaveBeenCalledWith(PAYLOAD, PARAMS);
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
});
