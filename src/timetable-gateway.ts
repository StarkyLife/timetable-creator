import { Timetable } from './models/timetable';

export interface TimetableGateway {
    getAll: () => Timetable[];
    getByName: (name: string) => Timetable | null;
    getById: (id: string) => Timetable | null;
    save: (timetable: Timetable) => void;
    delete: (id: string) => void;
}
