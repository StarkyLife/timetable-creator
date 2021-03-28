/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
export type SubjectCreationInfo = {
    name: string;
};

export type TeacherCreationInfo = {
    name: string;
    expertises: Array<{ name: string; load: number }>;
    dayOffsInWeek?: number[];
};

export type GroupCreationInfo = {
    name: string;
    workload: Array<{
        subject: string;
        load: number;
        difficulty: number;
        maxForDay: number;
        requiredTeachersCount: number;
        attachedTeachers: string[];
    }>;
};

export type TestRepresentableTimetableItem = {
    teachers: string[];
    subject: string;
    group: string;
    lesson: number;
    dayOfWeek: number;
};

export class TimetableCreationFixture {
    public timetable: TestRepresentableTimetableItem[] = [];

    createSubject(_info: SubjectCreationInfo) {
        throw new Error('Not implemented');
    }

    createTeacher(_info: TeacherCreationInfo) {
        throw new Error('Not implemented');
    }

    createGroup(_info: GroupCreationInfo) {
        throw new Error('Not implemented');
    }

    createTimetable(_options: { classPerDay: number }) {
        const timetable: TestRepresentableTimetableItem[] = [];

        this.timetable = timetable;
    }

    getNumberOfLessonsForEachDay() {
        return [];
    }

    getTotalNumberOfLessonsOfGroup(_groupName: string) {
        return -1;
    }

    getGroupTotalLoad(_groupName: string) {
        return -2;
    }

    getGivenTeacherActualLoad(_teacher: string) {
        return -1;
    }

    getGivenSubjectActualLoadForGivenGroup(_subjectName: string, _groupName: string) {
        return -1;
    }

    getLessonsADayCountForSubject(_subjectName: string, _groupName: string) {
        return [999];
    }

    getTeacherLessonsCountInOffDays(_teacherName: string) {
        return -1;
    }

    getDaysDifficultyForGroup(_groupName: string) {
        return {
            Monday: -1,
            Tuesday: -1,
            Wednesday: -1,
            Thursday: -1,
            Friday: -1,
            Saturday: -1,
        };
    }

    getLessonsDifficultiesByDay(_groupName: string) {
        return [
            {
                first: 0,
                second: 0,
                third: 0,
                forth: 0,
                fifth: 0,
                sixth: 0,
            },
        ];
    }
}
