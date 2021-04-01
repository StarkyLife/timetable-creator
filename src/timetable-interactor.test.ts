import { createMockTimetableGateway } from '@tests/doubles/mock-timetable-gateway';
import { Timetable } from './models/timetable';
import { createTimetableInteractor } from './timetable-interactor';

let mockTimetableGateway: ReturnType<typeof createMockTimetableGateway>;
let timetableInteractor: ReturnType<typeof createTimetableInteractor>;

beforeEach(() => {
    mockTimetableGateway = createMockTimetableGateway();
    timetableInteractor = createTimetableInteractor(mockTimetableGateway);
});

it('should save given valid timetable', () => {
    const validTimetable: Timetable = {
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
        { staff: 'suspicious' } as unknown as Timetable,
    )).toThrowError();
});
