/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { TimetableGateway } from '@src/timetable-gateway';
import { createTimetableInteractor } from '@src/timetable-interactor';
import { createMockTimetableGateway } from '@tests/doubles/mock-timetable-gateway';

type TimetableTestRepresentation = { id: string; name: string };

export class TimetableCRUDFixture {
    private timetableGateway: TimetableGateway;

    private timetableInteractor: ReturnType<typeof createTimetableInteractor>;

    constructor() {
        this.timetableGateway = createMockTimetableGateway();
        this.timetableInteractor = createTimetableInteractor(this.timetableGateway);
    }

    createTimetable(name: string) {
        this.timetableInteractor.save({ name });
    }

    updateTimetable(timetable: TimetableTestRepresentation) {
        this.timetableInteractor.save(timetable);
    }

    deleteTimetable(name: string) {
        const timetable = this.timetableGateway.getByName(name);

        if (timetable?.id) this.timetableGateway.delete(timetable.id);
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
