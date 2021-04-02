import { CanSaveTimetable } from './can-save-timetable';
import { createTimetable, Timetable } from './models/timetable';
import { TimetableGateway } from './timetable-gateway';

export function createTimetableInteractor(gateway: TimetableGateway): CanSaveTimetable {
    return {
        save(timetable: Timetable) {
            return gateway.save(createTimetable(timetable));
        },
    };
}
