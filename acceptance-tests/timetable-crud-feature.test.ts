/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TimetableCRUDFixture } from '@fixtures/timetable-crud-fixture';

let timetableCRUD: TimetableCRUDFixture;

beforeEach(() => {
    timetableCRUD = new TimetableCRUDFixture();
});

describe.skip('Given saved timetable', () => {
    const defaultTimetableName = 't1';

    beforeEach(() => {
        timetableCRUD.createTimetable(defaultTimetableName);
    });

    it('can get list of saved timetables', () => {
        const secondTimetable = 't2';

        timetableCRUD.createTimetable(secondTimetable);

        expect(timetableCRUD.getSavedTimetablesNames())
            .toEqual([defaultTimetableName, secondTimetable]);
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

describe.skip('Validation', () => {
    it('should throw an error if trying to CREATE timetable with wrong format', () => {
        expect(() => timetableCRUD.createTimetableWithWrongFormat('t2')).toThrowError();
    });

    it('should throw an error if trying to UPDATE timetable with wrong format', () => {
        expect(() => timetableCRUD.updateTimetableWithWrongFormat('t2')).toThrowError();
    });
});
