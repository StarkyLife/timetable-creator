import { SavedTimetableRepresentation, TimetableRepresentation } from '@src/core/representation-models/timetable-representation';
import { TimetableGateway } from '@src/core/timetable-gateway';
import { createTimetableInteractor } from '@src/core/timetable-interactor';
import { createMockTimetableGateway } from '@tests/doubles/mock-timetable-gateway';

export class TimetableCRUDFixture {
    private timetableGateway: TimetableGateway;

    private timetableInteractor: ReturnType<typeof createTimetableInteractor>;

    constructor() {
        this.timetableGateway = createMockTimetableGateway();
        this.timetableInteractor = createTimetableInteractor(this.timetableGateway);
    }

    createEmptyTimetable(name: string) {
        return this.timetableInteractor.save({ name });
    }

    updateTimetable(timetable: TimetableRepresentation) {
        return this.timetableInteractor.save(timetable);
    }

    deleteTimetable(name: string) {
        const timetable = this.timetableGateway.getByName(name);

        if (timetable?.id) this.timetableInteractor.deleteTimetable(timetable.id);
    }

    getTimetableById(id: string): SavedTimetableRepresentation | null {
        return this.timetableInteractor.getTimetable(id);
    }

    getTimetablesShortInfoList(): Array<{ id: string; name: string }> {
        return this.timetableInteractor.getTimetablesShortInfoList();
    }

    getSavedTimetablesNames() {
        return this.timetableGateway.getAll().map((t) => t.name);
    }

    getTimetableByName(name: string): SavedTimetableRepresentation | null {
        return this.timetableGateway.getByName(name);
    }
}
