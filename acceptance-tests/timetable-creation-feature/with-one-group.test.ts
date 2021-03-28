import {
    GroupCreationInfo, SubjectCreationInfo, TeacherCreationInfo, TimetableCreationFixture,
} from '@src/fixtures/timetable-creation';

const defaultSubjectInfo: SubjectCreationInfo = { name: 'english' };
const defaultTeacherInfo: TeacherCreationInfo = { name: 'teacher', expertises: [{ name: defaultSubjectInfo.name, load: 1 }] };
const defaultGroupWorkloadInfo: GroupCreationInfo['workload'][0] = {
    subject: defaultSubjectInfo.name,
    load: 1,
    difficulty: 0,
    maxForDay: 1,
    requiredTeachersCount: 1,
    attachedTeachers: [],
};

let timetableCreation: TimetableCreationFixture;

beforeEach(() => {
    timetableCreation = new TimetableCreationFixture();
});

describe.skip('Given subject and teacher', () => {
    beforeEach(() => {
        timetableCreation.createSubject(defaultSubjectInfo);
        timetableCreation.createTeacher(defaultTeacherInfo);
    });

    it('should create empty timetable if no group exists', () => {
        timetableCreation.createTimetable({ classPerDay: 1 });

        expect(timetableCreation.timetable.length).toBe(0);
    });

    it('should show empty timetable if teacher is not attached', () => {
        timetableCreation.createGroup({
            name: '9a',
            workload: [defaultGroupWorkloadInfo],
        });
        timetableCreation.createTimetable({ classPerDay: 1 });

        expect(timetableCreation.timetable.length).toEqual(0);
    });
});

describe.skip('Given subject which requires 2 teachers, group with 1 hour load and 2 teachers', () => {
    beforeEach(() => {
        timetableCreation.createSubject({ name: defaultSubjectInfo.name });
        timetableCreation.createTeacher({ name: 'Ilya', expertises: [{ name: defaultSubjectInfo.name, load: 1 }] });
        timetableCreation.createTeacher({ name: 'Andrew', expertises: [{ name: defaultSubjectInfo.name, load: 1 }] });
        timetableCreation.createGroup({
            name: '9a',
            workload: [
                {
                    ...defaultGroupWorkloadInfo,
                    subject: defaultSubjectInfo.name,
                    requiredTeachersCount: 2,
                    attachedTeachers: ['Ilya', 'Andrew'],
                },
            ],
        });
    });

    it('should show information about 1 class with both teachers used', () => {
        timetableCreation.createTimetable({ classPerDay: 1 });

        expect(timetableCreation.timetable).toEqual([{
            teachers: ['Ilya', 'Andrew'],
            subject: defaultSubjectInfo.name,
            group: '9a',
            lesson: 1,
            dayOfWeek: 1,
        }]);
    });
});

describe.skip('Given 2 subjects', () => {
    const secondSubject: SubjectCreationInfo = { name: 'randomSubject' };

    beforeEach(() => {
        timetableCreation.createSubject(defaultSubjectInfo);
        timetableCreation.createSubject(secondSubject);
    });

    describe('Given teacher with expertise in this subjects with 2 hour load', () => {
        beforeEach(() => {
            timetableCreation.createTeacher({
                name: 'teacher',
                expertises: [
                    { name: defaultSubjectInfo.name, load: 1 },
                    { name: secondSubject.name, load: 1 },
                ],
            });
        });

        it('should show information about 2 classes in two days when create timetable with 1 class/day load', () => {
            timetableCreation.createGroup({
                name: '9a',
                workload: [{
                    ...defaultGroupWorkloadInfo,
                    subject: defaultSubjectInfo.name,
                    attachedTeachers: ['teacher'],
                }, {
                    ...defaultGroupWorkloadInfo,
                    subject: secondSubject.name,
                    attachedTeachers: ['teacher'],
                }],
            });
            timetableCreation.createTimetable({ classPerDay: 1 });

            expect(timetableCreation.timetable).toEqual([
                {
                    teachers: ['teacher'],
                    subject: defaultSubjectInfo.name,
                    group: '9a',
                    lesson: 1,
                    dayOfWeek: 1,
                },
                {
                    teachers: ['teacher'],
                    subject: secondSubject.name,
                    group: '9a',
                    lesson: 1,
                    dayOfWeek: 2,
                },
            ]);
        });
    });
});
