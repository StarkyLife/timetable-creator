import { createTimetable, Timetable } from './timetable';
import { testEntityCreation } from './test-utils';

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

testEntityCreation(
    'Timetable',
    createTimetable,
    validTimetable,
);
