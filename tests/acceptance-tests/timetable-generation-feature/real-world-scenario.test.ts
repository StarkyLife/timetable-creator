import {
    GroupCreationInfo,
    SubjectCreationInfo,
    TeacherCreationInfo,
    TimetableGenerationFixture,
} from '@tests/fixtures/timetable-generation';

const subjectNames = {
    RUSSIAN_LANGUAGE: 'рус.язык',
    RUSSIAN_LITERATURE: 'литература',
    NATIVE_LANGUAGE: 'род.литература',
    NATIVE_LITERATURE: 'род.язык',
    MATH: 'математика',
    TECHNOLOGY: 'технология',
    PHYSICS: 'физика',
    HISTORY: 'история',
    SPORTS: 'физическая культура',
    FOREIGN_LANGUAGE: 'иностр.язык',
    GEOGRAPHY: 'география',
    DRAWING: 'ИЗО',
    COMPUTER_SCIENCE: 'ИВТ',
    SOCIAL: 'общество',
    BIOLOGY: 'биология',
    MUSIC: 'музыка',
};
const subjectsForGroup: SubjectCreationInfo[] = Object.values(subjectNames).map((name) => ({ name }));

const teachers: TeacherCreationInfo[] = [
    {
        name: 'russian-teacher',
        dayOffsInWeek: [1],
        expertises: [
            { name: subjectNames.RUSSIAN_LANGUAGE, load: 4 * 2 },
            { name: subjectNames.RUSSIAN_LITERATURE, load: 2 * 2 },
        ],
    },
    {
        name: 'native-teacher',
        expertises: [
            { name: subjectNames.NATIVE_LANGUAGE, load: 2 * 2 },
            { name: subjectNames.NATIVE_LITERATURE, load: 2 * 2 },
        ],
    },
    {
        name: 'history-teacher',
        expertises: [
            { name: subjectNames.HISTORY, load: 2 * 2 },
        ],
    },
    {
        name: 'math-teacher',
        expertises: [
            { name: subjectNames.MATH, load: 6 * 2 },
        ],
    },
    {
        name: 'music-teacher',
        expertises: [
            { name: subjectNames.MUSIC, load: 1 * 2 },
        ],
    },
    {
        name: 'biology-and-drawing',
        expertises: [
            { name: subjectNames.BIOLOGY, load: 1 * 2 },
            { name: subjectNames.DRAWING, load: 1 * 2 },
        ],
    },
    {
        name: 'sports-teacher',
        expertises: [
            { name: subjectNames.SPORTS, load: 3 * 2 },
        ],
    },
    {
        name: 'social-teacher',
        expertises: [
            { name: subjectNames.SOCIAL, load: 1 * 2 },
        ],
    },
    {
        name: 'foreign-teacher',
        expertises: [
            { name: subjectNames.FOREIGN_LANGUAGE, load: 3 * 2 },
        ],
    },
    {
        name: 'computer-teacher',
        expertises: [
            { name: subjectNames.COMPUTER_SCIENCE, load: 1 * 2 },
        ],
    },
    {
        name: 'geography-teacher',
        expertises: [
            { name: subjectNames.GEOGRAPHY, load: 2 * 2 },
        ],
    },
    {
        name: 'physics-teacher',
        expertises: [
            { name: subjectNames.PHYSICS, load: 2 * 2 },
        ],
    },
    {
        name: 'girl-teacher',
        expertises: [
            { name: subjectNames.TECHNOLOGY, load: 2 * 2 },
        ],
    },
    {
        name: 'boy-teacher',
        expertises: [
            { name: subjectNames.TECHNOLOGY, load: 2 * 2 },
        ],
    },
];

const groupWorkload: GroupCreationInfo['workload'] = [
    {
        subject: subjectNames.RUSSIAN_LANGUAGE, load: 4, difficulty: 11, maxForDay: 1, requiredTeachersCount: 1, attachedTeachers: ['russian-teacher'],
    },
    {
        subject: subjectNames.RUSSIAN_LITERATURE, load: 2, difficulty: 4, maxForDay: 1, requiredTeachersCount: 1, attachedTeachers: ['russian-teacher'],
    },
    {
        subject: subjectNames.NATIVE_LANGUAGE, load: 2, difficulty: 0, maxForDay: 1, requiredTeachersCount: 1, attachedTeachers: ['native-teacher'],
    },
    {
        subject: subjectNames.NATIVE_LITERATURE, load: 2, difficulty: 0, maxForDay: 1, requiredTeachersCount: 1, attachedTeachers: ['native-teacher'],
    },
    {
        subject: subjectNames.MATH, load: 6, difficulty: 10, maxForDay: 1, requiredTeachersCount: 1, attachedTeachers: ['math-teacher'],
    },
    {
        subject: subjectNames.TECHNOLOGY, load: 2, difficulty: 2, maxForDay: 2, requiredTeachersCount: 2, attachedTeachers: ['girl-teacher', 'boy-teacher'],
    },
    {
        subject: subjectNames.PHYSICS, load: 2, difficulty: 8, maxForDay: 1, requiredTeachersCount: 1, attachedTeachers: ['physics-teacher'],
    },
    {
        subject: subjectNames.HISTORY, load: 2, difficulty: 6, maxForDay: 1, requiredTeachersCount: 1, attachedTeachers: ['history-teacher'],
    },
    {
        subject: subjectNames.SPORTS, load: 3, difficulty: 2, maxForDay: 1, requiredTeachersCount: 1, attachedTeachers: ['sports-teacher'],
    },
    {
        subject: subjectNames.FOREIGN_LANGUAGE, load: 3, difficulty: 10, maxForDay: 1, requiredTeachersCount: 1, attachedTeachers: ['foreign-teacher'],
    },
    {
        subject: subjectNames.GEOGRAPHY, load: 2, difficulty: 6, maxForDay: 1, requiredTeachersCount: 1, attachedTeachers: ['geography-teacher'],
    },
    {
        subject: subjectNames.DRAWING, load: 1, difficulty: 1, maxForDay: 1, requiredTeachersCount: 1, attachedTeachers: ['biology-and-drawing'],
    },
    {
        subject: subjectNames.COMPUTER_SCIENCE, load: 1, difficulty: 4, maxForDay: 1, requiredTeachersCount: 1, attachedTeachers: ['computer-teacher'],
    },
    {
        subject: subjectNames.SOCIAL, load: 1, difficulty: 9, maxForDay: 1, requiredTeachersCount: 1, attachedTeachers: ['social-teacher'],
    },
    {
        subject: subjectNames.BIOLOGY, load: 1, difficulty: 7, maxForDay: 1, requiredTeachersCount: 1, attachedTeachers: ['biology-and-drawing'],
    },
    {
        subject: subjectNames.MUSIC, load: 1, difficulty: 1, maxForDay: 1, requiredTeachersCount: 1, attachedTeachers: ['music-teacher'],
    },
];

const groups: GroupCreationInfo[] = [
    { name: '7a', type: '7', workload: groupWorkload },
    { name: '7б', type: '7', workload: groupWorkload },
];

let timetableGeneration: TimetableGenerationFixture;

beforeEach(() => {
    timetableGeneration = new TimetableGenerationFixture();
});

describe.skip('Given subjects', () => {
    beforeEach(() => {
        subjectsForGroup.forEach(timetableGeneration.createSubject);
    });

    describe('Given teachers for subjects', () => {
        beforeEach(() => {
            teachers.forEach(timetableGeneration.createTeacher);
        });

        describe('Given groups', () => {
            beforeEach(() => {
                groups.forEach(timetableGeneration.createGroup);
            });

            it('should create timetable with correct number of lessons for each day', () => {
                timetableGeneration.generateTimetable({ classPerDay: 6 });

                expect(
                    timetableGeneration.getNumberOfLessonsForEachDay().every((n) => n <= 6),
                ).toBe(true);
            });
            it('should create timetable with correct group load', () => {
                timetableGeneration.generateTimetable({ classPerDay: 6 });

                groups.forEach((group) => {
                    expect(
                        timetableGeneration.getTotalNumberOfLessonsOfGroup(group.name),
                    ).toEqual(
                        timetableGeneration.getGroupTotalLoad(group.name),
                    );
                });
            });

            describe.each(teachers)('For teacher %s', (teacher) => {
                it('should create timetable with correct load', () => {
                    timetableGeneration.generateTimetable({ classPerDay: 6 });

                    expect(timetableGeneration.getGivenTeacherActualLoad(teacher.name))
                        .toEqual(teacher.expertises.reduce((totalLoad, e) => totalLoad + e.load, 0));
                });

                it('should create timetable where teacher have his days-off', () => {
                    timetableGeneration.generateTimetable({ classPerDay: 6 });

                    expect(timetableGeneration.getTeacherLessonsCountInOffDays(teacher.name)).toBe(0);
                });
            });

            describe.each(groups)('For group %s', (group) => {
                describe.each(group.workload)('for subject %s', (loadInfo) => {
                    it('should create timetable with correct load', () => {
                        timetableGeneration.generateTimetable({ classPerDay: 6 });

                        expect(timetableGeneration.getGivenSubjectActualLoadForGivenGroup(loadInfo.subject, group.name))
                            .toEqual(loadInfo.load);
                    });

                    it('should create timetable in which lessons with subject are less or equal maxPerDay', () => {
                        timetableGeneration.generateTimetable({ classPerDay: 6 });

                        const lessonsCountForEveryDay = timetableGeneration.getLessonsADayCountForSubject(loadInfo.subject, group.name);

                        expect(lessonsCountForEveryDay.every((c) => c <= loadInfo.maxForDay))
                            .toBe(true);
                    });
                });

                it('should create timetable in which 1-4 lessons are the most difficult ones and 5-* are least difficult', () => {
                    timetableGeneration.generateTimetable({ classPerDay: 6 });

                    const daysWithLessonsDifficulties = timetableGeneration.getLessonsDifficultiesByDay(group.name);

                    daysWithLessonsDifficulties.forEach((lessonsDifficulty) => {
                        expect(lessonsDifficulty.fifth).toBeLessThan(lessonsDifficulty.first);
                        expect(lessonsDifficulty.fifth).toBeLessThan(lessonsDifficulty.second);
                        expect(lessonsDifficulty.fifth).toBeLessThan(lessonsDifficulty.third);
                        expect(lessonsDifficulty.fifth).toBeLessThan(lessonsDifficulty.forth);

                        expect(lessonsDifficulty.sixth).toBeLessThan(lessonsDifficulty.first);
                        expect(lessonsDifficulty.sixth).toBeLessThan(lessonsDifficulty.second);
                        expect(lessonsDifficulty.sixth).toBeLessThan(lessonsDifficulty.third);
                        expect(lessonsDifficulty.sixth).toBeLessThan(lessonsDifficulty.forth);
                    });
                });

                it('should create timetable in which Tuesday, Wednesday and Thursday are most difficult and Saturday is least difficult', () => {
                    timetableGeneration.generateTimetable({ classPerDay: 6 });

                    const daysDifficulty = timetableGeneration.getDaysDifficultyForGroup(group.name);

                    expect(daysDifficulty.Monday).toBeLessThan(daysDifficulty.Tuesday);
                    expect(daysDifficulty.Monday).toBeLessThan(daysDifficulty.Wednesday);
                    expect(daysDifficulty.Monday).toBeLessThan(daysDifficulty.Thursday);

                    expect(daysDifficulty.Friday).toBeLessThan(daysDifficulty.Tuesday);
                    expect(daysDifficulty.Friday).toBeLessThan(daysDifficulty.Wednesday);
                    expect(daysDifficulty.Friday).toBeLessThan(daysDifficulty.Thursday);

                    expect(daysDifficulty.Saturday).toBeLessThan(daysDifficulty.Monday);
                    expect(daysDifficulty.Saturday).toBeLessThan(daysDifficulty.Friday);
                });
            });
        });
    });
});
