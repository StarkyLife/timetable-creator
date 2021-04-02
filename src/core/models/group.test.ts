import { createGroup, Group } from './group';
import { testEntityCreation } from './test-utils';

const validGroup: Group = {
    id: 'id',
    name: 'group',
    type: 'groupType',
    workload: [{
        subjectId: 'subjectId',
        load: 1,
        difficulty: 0,
        maxForDay: 1,
        requiredTeachersCount: 2,
        attachedTeachersIds: ['teacherId'],
    }],
};

testEntityCreation(
    'Group',
    createGroup,
    validGroup,
);
