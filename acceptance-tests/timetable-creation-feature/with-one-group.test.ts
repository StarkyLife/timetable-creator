import { TimetableCreation } from '@src/fixtures/timetable-creation';

const subjectNames = ['english', 'rus', 'sports', 'math', 'physics', 'chemistry', 'biology'];

describe.skip('Given subject and teacher', () => {
    beforeEach(() => {
        TimetableCreation.createSubject(subjectNames[0]);
        TimetableCreation.createTeacher('teacher', [{ name: subjectNames[0], load: 1 }]);
    });

    it('should create empty timetable if no group exists', () => {
        const timetable = TimetableCreation.createTimetable({ classPerDay: 1 });

        expect(timetable.length).toBe(0);
    });

    it('should show empty timetable if teacher is not attached', () => {
        TimetableCreation.createGroup('9a', [{
            subject: subjectNames[0],
            load: 1,
            attachedTeachers: [],
        }]);
        const timetable = TimetableCreation.createTimetable({ classPerDay: 1 });

        expect(timetable.length).toEqual(0);
    });
});

describe.skip('Given subject which requires 2 teachers, group with 1 hour load and 2 teachers', () => {
    beforeEach(() => {
        TimetableCreation.createSubject(subjectNames[0], { requiredTeachersCount: 2 });
        TimetableCreation.createTeacher('Ilya', [{ name: subjectNames[0], load: 1 }]);
        TimetableCreation.createTeacher('Andrew', [{ name: subjectNames[0], load: 1 }]);
        TimetableCreation.createGroup('9a', [
            { subject: subjectNames[0], load: 1, attachedTeachers: ['Ilya', 'Andrew'] },
        ]);
    });

    it('should show information about 1 class with both teachers used', () => {
        const timetable = TimetableCreation.createTimetable({ classPerDay: 1 });

        expect(timetable).toEqual([{
            teachers: ['Ilya', 'Andrew'],
            subject: subjectNames[0],
            group: '9a',
            lesson: 1,
            dayOfWeek: 1,
        }]);
    });
});

describe.skip('Given 2 subjects', () => {
    const subjectsForTest = subjectNames.slice(0, 2);

    beforeEach(() => {
        subjectsForTest.forEach((n) => TimetableCreation.createSubject(n));
    });

    describe('Given teacher with expertise in this subjects with 2 hour load', () => {
        beforeEach(() => {
            TimetableCreation.createTeacher('teacher', subjectsForTest.map((s) => ({ name: s, load: 1 })));
        });
        it('should show information about 2 classes in two days when create timetable with 1 class/day load', () => {
            TimetableCreation.createGroup('9a', [{
                subject: subjectsForTest[0],
                load: 1,
                attachedTeachers: ['teacher'],
            }, {
                subject: subjectsForTest[1],
                load: 1,
                attachedTeachers: ['teacher'],
            }]);
            const timetable = TimetableCreation.createTimetable({ classPerDay: 1 });

            expect(timetable).toEqual([
                {
                    teachers: ['teacher'],
                    subject: subjectsForTest[0],
                    group: '9a',
                    lesson: 1,
                    dayOfWeek: 1,
                },
                {
                    teachers: ['teacher'],
                    subject: subjectsForTest[1],
                    group: '9a',
                    lesson: 1,
                    dayOfWeek: 2,
                },
            ]);
        });
    });

    describe('Given teacher with expertise in this subjects with only 1 hour load', () => {
        beforeEach(() => {
            TimetableCreation.createTeacher('teacher', [
                { name: subjectsForTest[0], load: 1 },
                { name: subjectsForTest[1], load: 0 },
            ]);
        });
        it('should show information about 1 class only', () => {
            TimetableCreation.createGroup('9a', [{
                subject: subjectsForTest[0],
                load: 1,
                attachedTeachers: ['teacher'],
            }, {
                subject: subjectsForTest[1],
                load: 1,
                attachedTeachers: ['teacher'],
            }]);
            const timetable = TimetableCreation.createTimetable({ classPerDay: 1 });

            expect(timetable).toEqual([
                {
                    teachers: ['teacher'],
                    subject: subjectsForTest[0],
                    group: '9a',
                    lesson: 1,
                    dayOfWeek: 1,
                },
            ]);
        });
    });
});
