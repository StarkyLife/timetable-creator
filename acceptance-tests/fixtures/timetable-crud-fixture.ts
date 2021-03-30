/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

export type TimetableTestRepresentation = { id: string; name: string };

export class TimetableCRUDFixture {
    createTimetable(_name: string) { }

    updateTimetable(_timetable: TimetableTestRepresentation) {}

    deleteTimetable(_name: string) { }

    getTimetableById(_id: string): TimetableTestRepresentation | null {
        return null;
    }

    getSavedTimetablesNames() {
        return [];
    }

    getTimetableByName(_name: string): TimetableTestRepresentation | null {
        return null;
    }

    createTimetableWithWrongFormat(_name: string) {}

    updateTimetableWithWrongFormat(_name: string) {}
}
