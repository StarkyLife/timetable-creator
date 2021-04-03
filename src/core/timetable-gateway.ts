import { Timetable, SavedTimetable } from './entities/timetable';

export interface TimetableGateway {
    getAll: () => SavedTimetable[];
    getByName: (name: string) => SavedTimetable | null;
    getById: (id: string) => SavedTimetable | null;
    save: (timetable: Timetable) => SavedTimetable;
    delete: (id: string) => void;
}
