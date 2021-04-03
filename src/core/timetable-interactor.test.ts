import { createMockTimetableGateway } from '@tests/doubles/mock-timetable-gateway';
import { TimetableRepresentation } from './representation-models/timetable-representation';
import { createTimetableInteractor } from './timetable-interactor';

let mockTimetableGateway: ReturnType<typeof createMockTimetableGateway>;
let timetableInteractor: ReturnType<typeof createTimetableInteractor>;

beforeEach(() => {
    mockTimetableGateway = createMockTimetableGateway();
    timetableInteractor = createTimetableInteractor(mockTimetableGateway);
});

describe('Saving', () => {
    it('should save given valid timetable', () => {
        const validTimetable: TimetableRepresentation = {
            name: 'timetable',
        };

        const savedTimetable = timetableInteractor.save(validTimetable);

        expect(savedTimetable.id).toBeTruthy();
        expect(
            mockTimetableGateway.getByName(validTimetable.name),
        ).not.toBeNull();
    });

    it('should throw an error on creation given invalid timetable', () => {
        expect(() => timetableInteractor.save(
            { staff: 'suspicious' } as unknown as TimetableRepresentation,
        )).toThrowError();
    });
});

describe('Getting short info list', () => {
    it('should return empty list when no timetables exist', () => {
        const timetablesShortInfo = timetableInteractor.getTimetablesShortInfoList();

        expect(timetablesShortInfo).toEqual([]);
    });
    it('should return list of saved timetables short info', () => {
        const savedTimetable = mockTimetableGateway.save(
            { name: 'one', subjects: [{ id: 's', name: 's' }] },
        );

        const timetablesShortInfo = timetableInteractor.getTimetablesShortInfoList();

        expect(timetablesShortInfo).toEqual([{
            id: savedTimetable.id,
            name: savedTimetable.name,
        }]);
    });
});

describe('Getting full info by ID', () => {
    it('should return `null` if no timetable with given ID exists', () => {
        expect(
            timetableInteractor.getTimetable('randomId'),
        ).toBeNull();
    });

    it('should return timetable when given existing timetable ID', () => {
        const savedTimetable = mockTimetableGateway.save(
            { id: 'id', name: 'one', subjects: [{ id: 's', name: 's' }] },
        );

        expect(
            timetableInteractor.getTimetable(savedTimetable.id),
        ).toEqual(
            savedTimetable,
        );
    });
});

describe('Deletion', () => {
    it('should delete existing timetable', () => {
        const savedTimetable = mockTimetableGateway.save(
            { id: 'id', name: 'one' },
        );

        timetableInteractor.deleteTimetable(savedTimetable.id);

        expect(
            mockTimetableGateway.getById(savedTimetable.id),
        ).toBeNull();
    });
});
