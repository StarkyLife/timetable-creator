import { SavedTimetable } from '@src/models/timetable';
import type { TimetableGateway } from '@src/timetable-gateway';
import { uniqueId } from 'lodash';

export function createMockTimetableGateway(): TimetableGateway {
    const savedTimetables: Map<string, SavedTimetable> = new Map();

    return {
        save(timetable) {
            const currentId = timetable.id || uniqueId();
            const timetableToSave: SavedTimetable = { ...timetable, id: currentId };

            savedTimetables.set(currentId, timetableToSave);

            return timetableToSave;
        },
        getAll() {
            return Array.from(savedTimetables.values());
        },
        getByName(name) {
            return Array.from(savedTimetables.values())
                .find((t) => t.name === name) ?? null;
        },
        getById(id) {
            return savedTimetables.get(id) ?? null;
        },
        delete(id) {
            savedTimetables.delete(id);
        },
    };
}
