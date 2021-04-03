import type {
    TimetableInteractor,
} from './timetable-interactor-types';
import { createTimetable } from './entities/timetable';
import type { TimetableGateway } from './timetable-gateway';

export function createTimetableInteractor(
    gateway: TimetableGateway,
): TimetableInteractor {
    return {
        save(timetable) {
            return gateway.save(createTimetable(timetable));
        },
        getTimetablesShortInfoList() {
            return gateway.getAll().map((t) => ({ id: t.id, name: t.name }));
        },
        getTimetable(id) {
            return gateway.getById(id);
        },
        deleteTimetable(id) {
            gateway.delete(id);
        },
    };
}
