import { SavedTimetable, Timetable } from '@src/core/entities/timetable';

export type TimetableShortInfoRepresentation = {
    id: string;
    name: string;
};

export type TimetableRepresentation = Timetable;
export type SavedTimetableRepresentation = SavedTimetable;
