import { TimetableRepresentation } from '@src/core/representation-models/timetable-representation';
import type { TimetableInteractor } from '@src/core/timetable-interactor-types';
import { Router } from 'express';
import { createMiddleware } from '../utils/middleware-factory';

export function createTimetableController(timetableInteractor: TimetableInteractor) {
    const router = Router();

    router.post('/', createMiddleware(
        (payload: TimetableRepresentation) => timetableInteractor.save(payload),
    ));
    router.get('/', createMiddleware(
        () => timetableInteractor.getTimetablesShortInfoList(),
    ));
    router.get<{ id: string }>('/:id', (request, response) => {
        try {
            const timetable = timetableInteractor.getTimetable(request.params.id);

            if (!timetable) {
                return response.status(404).send('No timetable with given ID');
            }

            return response.json(timetable);
        } catch (error) {
            return response.sendStatus(500);
        }
    });
    router.delete('/:id', createMiddleware(
        (_, params: { id: string }) => timetableInteractor.deleteTimetable(params.id),
    ));

    return router;
}
