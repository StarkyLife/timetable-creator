/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TimetableCRUDFixture } from '@tests/fixtures/timetable-crud-fixture';

let timetableCRUD: TimetableCRUDFixture;

beforeEach(() => {
    timetableCRUD = new TimetableCRUDFixture();
});

describe('Given saved timetable', () => {
    const defaultTimetableName = 't1';

    beforeEach(() => {
        timetableCRUD.createEmptyTimetable(defaultTimetableName);
    });

    it('can get list of saved timetables', () => {
        const secondTimetableName = 't2';

        timetableCRUD.createEmptyTimetable(secondTimetableName);

        expect(timetableCRUD.getSavedTimetablesNames())
            .toEqual([defaultTimetableName, secondTimetableName]);
    });

    it('can delete existing timetable', () => {
        timetableCRUD.deleteTimetable(defaultTimetableName);

        expect(timetableCRUD.getSavedTimetablesNames().length).toBe(0);
    });

    it('can update existing timetable', () => {
        const savedTimetable = timetableCRUD.getTimetableByName(defaultTimetableName);

        timetableCRUD.updateTimetable({
            ...savedTimetable!,
            name: 'newName',
        });

        const updatedTimetable = timetableCRUD.getTimetableById(savedTimetable!.id);

        expect(updatedTimetable!.name).toEqual('newName');
    });
});

describe('Given 2 filled timetables', () => {
    const firstTimetableName = 'one';
    const secondTimetableName = 'two';

    beforeEach(() => {
        timetableCRUD.updateTimetable({
            ...timetableCRUD.createEmptyTimetable(firstTimetableName),
            subjects: [{ id: 'id', name: 's' }],
        });
        timetableCRUD.updateTimetable({
            ...timetableCRUD.createEmptyTimetable(secondTimetableName),
            subjects: [{ id: 'id', name: 's' }],
        });
    });

    it('can get short info about all available timetables', () => {
        expect(timetableCRUD.getTimetablesShortInfoList())
            .toEqual(
                expect.arrayContaining([
                    { id: expect.any(String), name: firstTimetableName },
                    { id: expect.any(String), name: secondTimetableName },
                ]),
            );
    });
});
