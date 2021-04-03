import { SavedTimetableRepresentation, TimetableRepresentation, TimetableShortInfoRepresentation } from '@src/core/representation-models/timetable-representation';
import type { TimetableInteractor } from '@src/core/timetable-interactor-types';
import { Router } from 'express';
import { createMiddleware } from '../utils/middleware-factory';

export function createTimetableController(timetableInteractor: TimetableInteractor) {
    const router = Router();

    router.post('/', createMiddleware<TimetableRepresentation, SavedTimetableRepresentation>(
        (payload) => timetableInteractor.save(payload),
    ));
    router.get('/', createMiddleware<unknown, TimetableShortInfoRepresentation[]>(
        timetableInteractor.getTimetablesShortInfoList,
    ));

    return router;
}
