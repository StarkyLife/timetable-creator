/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { TimetableWithoutId } from '@src/models/timetable';
import { TimetableGateway } from '@src/timetable-gateway';
import { createMockTimetableGateway } from '@tests/doubles/mock-timetable-gateway';

export type TimetableTestRepresentation = { id: string; name: string };

const dummyTimetable: TimetableWithoutId = {
    name: '',
    subjects: [],
    teachers: [],
    groups: [],
    lessons: [],
};

export class TimetableCRUDFixture {
    private timetableGateway: TimetableGateway;

    constructor() {
        this.timetableGateway = createMockTimetableGateway();
    }

    createTimetable(name: string) {
        this.timetableGateway.save({
            ...dummyTimetable,
            name,
        });
    }

    updateTimetable(timetable: TimetableTestRepresentation) {
        this.timetableGateway.update({
            ...dummyTimetable,
            ...timetable,
        });
    }

    deleteTimetable(name: string) {
        const timetable = this.timetableGateway.getByName(name);

        if (timetable) this.timetableGateway.delete(timetable.id);
    }

    getTimetableById(id: string): TimetableTestRepresentation | null {
        return this.timetableGateway.getById(id);
    }

    getSavedTimetablesNames() {
        const timetables = this.timetableGateway.getAll();

        return timetables.map((t) => t.name);
    }

    getTimetableByName(name: string): TimetableTestRepresentation | null {
        return this.timetableGateway.getByName(name);
    }
}
