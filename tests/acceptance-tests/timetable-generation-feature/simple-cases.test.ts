import {
    GroupCreationInfo,
    SubjectCreationInfo,
    TeacherCreationInfo,
    TimetableGenerationFixture,
} from '@tests/fixtures/timetable-generation';

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

let timetableGeneration: TimetableGenerationFixture;

beforeEach(() => {
    timetableGeneration = new TimetableGenerationFixture();
});

describe.skip('Given subject and teacher', () => {
    beforeEach(() => {
        timetableGeneration.createSubject(defaultSubjectInfo);
    });

    describe('Given teacher', () => {
        beforeEach(() => {
            timetableGeneration.createTeacher(defaultTeacherInfoWith1HourLoad);
        });

        it('should create empty timetable if no group exists', () => {
            timetableGeneration.generateTimetable({ classPerDay: 1 });

            expect(timetableGeneration.timetable.length).toBe(0);
        });

        it('should show empty timetable if teacher is not attached', () => {
            timetableGeneration.createGroup({
                name: '9a',
                type: '9',
                workload: [defaultGroupWorkloadInfo],
            });
            timetableGeneration.generateTimetable({ classPerDay: 1 });

            expect(timetableGeneration.timetable.length).toEqual(0);
        });

        describe('Given group that requires 2 teachers in 1 subject and 2 teachers', () => {
            beforeEach(() => {
                timetableGeneration.createTeacher({ name: 'Ilya', expertises: [{ name: defaultSubjectInfo.name, load: 1 }] });
                timetableGeneration.createTeacher({ name: 'Andrew', expertises: [{ name: defaultSubjectInfo.name, load: 1 }] });
                timetableGeneration.createGroup({
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
                timetableGeneration.generateTimetable({ classPerDay: 1 });

                expect(timetableGeneration.timetable).toEqual<typeof timetableGeneration.timetable>([{
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
                timetableGeneration.createTeacher(defaultTeacherInfoWith1HourLoad);
                timetableGeneration.createGroup({
                    name: '9a',
                    type: '9',
                    workload: [{
                        ...defaultGroupWorkloadInfo,
                        subject: defaultSubjectInfo.name,
                        attachedTeachers: [defaultTeacherInfoWith1HourLoad.name],
                    }],
                });
                timetableGeneration.createGroup({
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
                timetableGeneration.generateTimetable({ classPerDay: 1 });

                expect(timetableGeneration.timetable).toEqual<typeof timetableGeneration.timetable>([{
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
        timetableGeneration.createSubject(defaultSubjectInfo);
        timetableGeneration.createSubject(secondSubject);
    });

    describe('Given teacher with expertise in this subjects with 2 hour load', () => {
        beforeEach(() => {
            timetableGeneration.createTeacher({
                name: 'teacher',
                expertises: [
                    { name: defaultSubjectInfo.name, load: 1 },
                    { name: secondSubject.name, load: 1 },
                ],
            });
        });

        it('should show information about 2 classes in two days when create timetable with 1 class/day load', () => {
            timetableGeneration.createGroup({
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
            timetableGeneration.generateTimetable({ classPerDay: 1 });

            expect(timetableGeneration.timetable).toEqual<typeof timetableGeneration.timetable>([
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
