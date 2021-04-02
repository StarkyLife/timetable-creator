import { createTeacher, Teacher } from './teacher';
import { testEntityCreation } from './test-utils';

const defaultValidTeacher: Teacher = {
    id: '1',
    name: 'teacher',
    expertises: [{ subjectId: 'subjectId', load: 1 }],
    daysOff: [1],
};

testEntityCreation(
    'Teacher',
    createTeacher,
    defaultValidTeacher,
);
