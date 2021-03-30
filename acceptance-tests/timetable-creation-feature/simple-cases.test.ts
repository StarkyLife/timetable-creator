import {
    GroupCreationInfo, SubjectCreationInfo, TeacherCreationInfo, TimetableCreationFixture,
} from '@src/fixtures/timetable-creation';

const defaultSubjectInfo: SubjectCreationInfo = { name: 'english' };
const defaultTeacherInfoWith1HourLoad: TeacherCreationInfo = { name: 'teacher', expertises: [{ name: defaultSubjectInfo.name, load: 1 }] };
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
    });

    describe('Given teacher', () => {
        beforeEach(() => {
            timetableCreation.createTeacher(defaultTeacherInfoWith1HourLoad);
        });

        it('should create empty timetable if no group exists', () => {
            timetableCreation.createTimetable({ classPerDay: 1 });

            expect(timetableCreation.timetable.length).toBe(0);
        });

        it('should show empty timetable if teacher is not attached', () => {
            timetableCreation.createGroup({
                name: '9a',
                type: '9',
                workload: [defaultGroupWorkloadInfo],
            });
            timetableCreation.createTimetable({ classPerDay: 1 });

            expect(timetableCreation.timetable.length).toEqual(0);
        });

        describe('Given group that requires 2 teachers in 1 subject and 2 teachers', () => {
            beforeEach(() => {
                timetableCreation.createTeacher({ name: 'Ilya', expertises: [{ name: defaultSubjectInfo.name, load: 1 }] });
                timetableCreation.createTeacher({ name: 'Andrew', expertises: [{ name: defaultSubjectInfo.name, load: 1 }] });
                timetableCreation.createGroup({
                    name: '9a',
                    type: '9',
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

                expect(timetableCreation.timetable).toEqual<typeof timetableCreation.timetable>([{
                    teachers: ['Ilya', 'Andrew'],
                    subject: defaultSubjectInfo.name,
                    groups: ['9a'],
                    lesson: 1,
                    dayOfWeek: 1,
                }]);
            });
        });

        describe('Given 2 groups with one type which can be combined and teacher with only 1 hour load', () => {
            beforeEach(() => {
                timetableCreation.createTeacher(defaultTeacherInfoWith1HourLoad);
                timetableCreation.createGroup({
                    name: '9a',
                    type: '9',
                    workload: [{
                        ...defaultGroupWorkloadInfo,
                        subject: defaultSubjectInfo.name,
                        attachedTeachers: [defaultTeacherInfoWith1HourLoad.name],
                    }],
                });
                timetableCreation.createGroup({
                    name: '9b',
                    type: '9',
                    workload: [{
                        ...defaultGroupWorkloadInfo,
                        subject: defaultSubjectInfo.name,
                        attachedTeachers: [defaultTeacherInfoWith1HourLoad.name],
                    }],
                });
            });

            it('it should create 1 lesson for 2 groups', () => {
                timetableCreation.createTimetable({ classPerDay: 1 });

                expect(timetableCreation.timetable).toEqual<typeof timetableCreation.timetable>([{
                    teachers: [defaultTeacherInfoWith1HourLoad.name],
                    subject: defaultSubjectInfo.name,
                    groups: ['9a', '9b'],
                    lesson: 1,
                    dayOfWeek: 1,
                }]);
            });
        });
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
                type: '9',
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

            expect(timetableCreation.timetable).toEqual<typeof timetableCreation.timetable>([
                {
                    teachers: ['teacher'],
                    subject: defaultSubjectInfo.name,
                    groups: ['9a'],
                    lesson: 1,
                    dayOfWeek: 1,
                },
                {
                    teachers: ['teacher'],
                    subject: secondSubject.name,
                    groups: ['9a'],
                    lesson: 1,
                    dayOfWeek: 2,
                },
            ]);
        });
    });
});
