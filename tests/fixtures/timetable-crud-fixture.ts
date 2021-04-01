/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { createTimetable } from '@src/models/timetable';
import { TimetableGateway } from '@src/timetable-gateway';
import { createMockTimetableGateway } from '@tests/doubles/mock-timetable-gateway';

export type TimetableTestRepresentation = { id: string; name: string };

export class TimetableCRUDFixture {
    private timetableGateway: TimetableGateway;

    constructor() {
        this.timetableGateway = createMockTimetableGateway();
    }

    createTimetable(name: string) {
        this.timetableGateway.save(
            createTimetable({ name }),
        );
    }

    updateTimetable(timetable: TimetableTestRepresentation) {
        this.timetableGateway.save(createTimetable(timetable));
    }

    deleteTimetable(name: string) {
        const timetable = this.timetableGateway.getByName(name);

        if (timetable) this.timetableGateway.delete(timetable.id);
    }

    createTimetableWithWrongFormat() {
        this.timetableGateway.save(
            createTimetable({ sthWrong: 'here' }),
        );
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
