import { CanSaveTimetable } from '@src/core/can-save-timetable';
import { SavedTimetable, Timetable } from '@src/core/models/timetable';
import { Request, Response } from 'express';
import { createTimetableSaveMiddleware } from './timetable-controller';

describe('Middleware for timetable saving', () => {
    function createAndCallMiddleware(
        timetableSaver: CanSaveTimetable,
        request: Partial<Request>,
        response: Partial<Response>,
    ) {
        const middleware = createTimetableSaveMiddleware(timetableSaver);

        middleware(request as Request, response as Response, jest.fn());
    }

    describe('Given timetable saver returning saved timetable', () => {
        const VALID_TIMETABLE: Timetable = { name: 'timetable' };
        const SAVED_TIMETABLE: SavedTimetable = {
            ...VALID_TIMETABLE,
            id: 'id',
        };
        let timetableSuccessSaver: CanSaveTimetable;

        beforeEach(() => {
            timetableSuccessSaver = {
                save: jest.fn(() => SAVED_TIMETABLE),
            };
        });

        it('should respond with saved timetable as json', () => {
            const responseMock = { json: jest.fn() } as Partial<Response>;

            createAndCallMiddleware(
                timetableSuccessSaver,
                { body: VALID_TIMETABLE },
                responseMock,
            );

            expect(responseMock.json).toHaveBeenCalledWith(SAVED_TIMETABLE);
            expect(timetableSuccessSaver.save).toHaveBeenCalledWith(VALID_TIMETABLE);
        });
    });

    describe('Given timetable saver throwing error', () => {
        let timetableSaverThrowingError: CanSaveTimetable;

        beforeEach(() => {
            timetableSaverThrowingError = {
                save: jest.fn(() => { throw new Error(); }),
            };
        });

        it('should respond with statusCode = 500', () => {
            const responseMock = { sendStatus: jest.fn() } as Partial<Response>;

            createAndCallMiddleware(
                timetableSaverThrowingError,
                { body: null },
                responseMock,
            );

            expect(responseMock.sendStatus).toHaveBeenCalledWith(500);
        });
    });
});
