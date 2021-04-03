import type { CanGetTimetablesShortInfoList, CanSaveTimetable, TimetableInteractor } from '@src/core/timetable-interactor-types';
import { Router, RequestHandler } from 'express';

export function createTimetableController(timetableInteractor: TimetableInteractor) {
    const router = Router();

    router.post('/', createTimetableSaveMiddleware(timetableInteractor));
    router.get('/', createTimetablesListGetMiddleware(timetableInteractor));

    return router;
}

export function createTimetableSaveMiddleware(
    timetableSaver: CanSaveTimetable,
): RequestHandler {
    return (request, response) => {
        try {
            return response.json(
                timetableSaver.save(request.body),
            );
        } catch (error) {
            return response.sendStatus(500);
        }
    };
}

export function createTimetablesListGetMiddleware(
    timetablesListGetter: CanGetTimetablesShortInfoList,
): RequestHandler {
    return (_request, response) => {
        try {
            return response.json(
                timetablesListGetter.getTimetablesShortInfoList(),
            );
        } catch (error) {
            return response.sendStatus(500);
        }
    };
}
