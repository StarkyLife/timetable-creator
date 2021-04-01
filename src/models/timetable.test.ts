import { createTimetable, Timetable } from './timetable';

describe(createTimetable.name, () => {
    it('should create timetable when valid source is passed', () => {
        const subjectId = 'subjectId';
        const teacherId = 'teacherId';
        const groupId = 'groupId';

        const validTimetable: Timetable = {
            id: '1',
            name: 'timetable',
            subjects: [{ id: subjectId, name: 'subject' }],
            teachers: [{
                id: teacherId,
                name: 'teacher',
                expertises: [{ subjectId, load: 1 }],
                daysOff: [1],
            }],
            groups: [{
                id: groupId,
                name: 'group',
                type: 'groupType',
                workload: [{
                    subjectId,
                    load: 1,
                    difficulty: 0,
                    maxForDay: 1,
                    requiredTeachersCount: 2,
                    attachedTeachersIds: [teacherId],
                }],
            }],
            lessons: [{
                ordinalDayNumber: 1,
                ordinalNumber: 1,
                subjectId,
                teachersIds: [teacherId],
                groupsIds: [groupId],
            }],
        };

        expect(
            createTimetable(validTimetable),
        ).toEqual(validTimetable);
    });

    it('should cast id given as number to string', () => {
        expect(
            createTimetable({ id: 1, name: 'timetable' }),
        ).toEqual({ id: '1', name: 'timetable' });
    });

    it('should remove unknown properties', () => {
        expect(
            createTimetable({
                id: 'id',
                name: 'timetable',
                weirdStaff: 'oh',
            }),
        ).toEqual({ id: 'id', name: 'timetable' });
    });

    it.each([
        undefined,
        null,
        {},
        { key: 'hello' },
        { id: 'id' },
    ])('should throw an error when invalid source (%s) is passed', (source) => {
        expect(() => createTimetable(source)).toThrowError();
    });
});
