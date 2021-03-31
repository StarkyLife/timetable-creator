import { Timetable, TimetableWithoutId } from './models/timetable';

export interface TimetableGateway {
    save: (timetable: TimetableWithoutId) => void;
    getAll: () => Timetable[];
    getByName: (name: string) => Timetable | null;
    getById: (id: string) => Timetable | null;
    delete: (id: string) => void;
    update: (timetable: Timetable) => void;
}
