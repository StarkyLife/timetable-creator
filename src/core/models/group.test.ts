import { createGroup, Group } from './group';

describe(createGroup.name, () => {
    it('should create group when valid source is passed', () => {
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

        expect(
            createGroup(validGroup),
        ).toEqual(
            validGroup,
        );
    });
});
