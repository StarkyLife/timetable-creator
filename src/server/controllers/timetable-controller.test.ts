import { SavedTimetableRepresentation, TimetableRepresentation, TimetableShortInfoRepresentation } from '@src/core/representation-models/timetable-representation';
import { CanGetTimetablesShortInfoList, CanSaveTimetable } from '@src/core/timetable-interactor-types';
import { Request, RequestHandler, Response } from 'express';
import { createTimetableSaveMiddleware, createTimetablesListGetMiddleware } from './timetable-controller';

const VALID_TIMETABLE: TimetableRepresentation = { name: 'timetable' };
const SAVED_TIMETABLE: SavedTimetableRepresentation = {
    ...VALID_TIMETABLE,
    id: 'id',
};

function createAndCallMiddleware<Interactor>(
    middlewareFactory: (interactor: Interactor) => RequestHandler,
    interactor: Interactor,
    request: Partial<Request>,
    response: Partial<Response>,
) {
    const middleware = middlewareFactory(interactor);

    middleware(request as Request, response as Response, jest.fn());
}

describe('Middleware for timetable saving', () => {
    describe('Given timetable saver returning saved timetable', () => {
        it('should respond with saved timetable as json', () => {
            const timetableSuccessSaver: CanSaveTimetable = {
                save: jest.fn(() => SAVED_TIMETABLE),
            };
            const responseMock = { json: jest.fn() } as Partial<Response>;

            createAndCallMiddleware(
                createTimetableSaveMiddleware,
                timetableSuccessSaver,
                { body: VALID_TIMETABLE },
                responseMock,
            );

            expect(responseMock.json).toHaveBeenCalledWith(SAVED_TIMETABLE);
            expect(timetableSuccessSaver.save).toHaveBeenCalledWith(VALID_TIMETABLE);
        });
    });

    describe('Given timetable saver throwing error', () => {
        it('should respond with statusCode = 500', () => {
            const timetableSaverThrowingError: CanSaveTimetable = {
                save: jest.fn(() => { throw new Error(); }),
            };
            const responseMock = { sendStatus: jest.fn() } as Partial<Response>;

            createAndCallMiddleware(
                createTimetableSaveMiddleware,
                timetableSaverThrowingError,
                { body: null },
                responseMock,
            );

            expect(responseMock.sendStatus).toHaveBeenCalledWith(500);
        });
    });
});

describe('Middleware for getting timetables list', () => {
    it('should respond with timetables list as json', () => {
        const TIMETABLES_SHORT_INFO: TimetableShortInfoRepresentation[] = [{
            id: SAVED_TIMETABLE.id,
            name: SAVED_TIMETABLE.name,
        }];
        const timetablesListGetter: CanGetTimetablesShortInfoList = {
            getTimetablesShortInfoList: jest.fn(() => TIMETABLES_SHORT_INFO),
        };
        const responseMock = { json: jest.fn() } as Partial<Response>;

        createAndCallMiddleware(
            createTimetablesListGetMiddleware,
            timetablesListGetter,
            {},
            responseMock,
        );

        expect(responseMock.json).toHaveBeenCalledWith(TIMETABLES_SHORT_INFO);
    });

    it('should respond with statusCode = 500 given timetable getter throwing error', () => {
        const timetablesGetterThrowingError: CanGetTimetablesShortInfoList = {
            getTimetablesShortInfoList: jest.fn(() => { throw new Error(); }),
        };
        const responseMock = { sendStatus: jest.fn() } as Partial<Response>;

        createAndCallMiddleware(
            createTimetablesListGetMiddleware,
            timetablesGetterThrowingError,
            {},
            responseMock,
        );

        expect(responseMock.sendStatus).toHaveBeenCalledWith(500);
    });
});
