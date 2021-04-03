import type { CanSaveTimetable } from '@src/core/timetable-interactor-types';
import { Router, RequestHandler } from 'express';

export function createTimetableController(timetableSaver: CanSaveTimetable) {
    const router = Router();

    router.post('/', createTimetableSaveMiddleware(timetableSaver));

    return router;
}

export function createTimetableSaveMiddleware(timetableSaver: CanSaveTimetable): RequestHandler {
    return (request, response) => {
        try {
            return response.json(timetableSaver.save(request.body));
        } catch (error) {
            return response.sendStatus(500);
        }
    };
}
