import {
    SavedTimetableRepresentation,
    TimetableRepresentation,
    TimetableShortInfoRepresentation,
} from './representation-models/timetable-representation';

export interface CanSaveTimetable {
    save: (timetable: TimetableRepresentation) => SavedTimetableRepresentation;
}

export interface CanGetTimetablesShortInfoList {
    getTimetablesShortInfoList: () => TimetableShortInfoRepresentation[];
}

export interface CanGetTimetableById {
    getTimetable: (id: string) => SavedTimetableRepresentation | null;
}

export interface CanDeleteTimetable {
    deleteTimetable: (id: string) => void;
}

export type TimetableInteractor = CanSaveTimetable
& CanGetTimetablesShortInfoList
& CanGetTimetableById
& CanDeleteTimetable;
