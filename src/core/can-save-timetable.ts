import { SavedTimetable, Timetable } from './models/timetable';

export interface CanSaveTimetable {
    save: (timetable: Timetable) => SavedTimetable;
}
