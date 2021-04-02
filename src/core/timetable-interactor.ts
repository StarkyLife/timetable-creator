import { createTimetable, Timetable } from './models/timetable';
import { TimetableGateway } from './timetable-gateway';

export function createTimetableInteractor(gateway: TimetableGateway) {
    return {
        save(timetable: Timetable) {
            return gateway.save(createTimetable(timetable));
        },
    };
}
