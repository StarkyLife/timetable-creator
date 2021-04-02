import { createSubject, Subject } from './subject';

describe(createSubject.name, () => {
    it('should create subject when valid source is passed', () => {
        const validSubject: Subject = {
            id: 'id',
            name: 'subject',
        };

        expect(
            createSubject(validSubject),
        ).toEqual(
            validSubject,
        );
    });
});
