import { createTeacher, Teacher } from './teacher';

describe(createTeacher.name, () => {
    const defaultTeacher: Teacher = {
        id: '1',
        name: 'teacher',
        expertises: [],
        daysOff: [],
    };

    it('should create teacher when valid source is passed', () => {
        const validTeacher: Teacher = {
            ...defaultTeacher,
            expertises: [{ subjectId: 'subjectId', load: 1 }],
            daysOff: [1],
        };

        expect(
            createTeacher(validTeacher),
        ).toEqual(
            validTeacher,
        );
    });

    it.each([
        undefined,
        null,
        {},
        { key: 'hello' },
        { id: 'id' },
        { name: 'teacher' },
        { id: 'id', name: 'teacher' },
        { id: 'id', name: 'teacher', expertises: [null] },
    ])('should throw an error when invalid source (%s) is passed', (source) => {
        expect(() => createTeacher(source)).toThrowError();
    });

    it('should cast id given as number to string', () => {
        expect(
            createTeacher({
                ...defaultTeacher,
                id: 1,
            }),
        ).toEqual({
            ...defaultTeacher,
            id: '1',
        });
    });

    it('should remove unknown properties', () => {
        expect(
            createTeacher({
                ...defaultTeacher,
                weirdStaff: 'oh',
            }),
        ).toEqual(defaultTeacher);
    });
});
