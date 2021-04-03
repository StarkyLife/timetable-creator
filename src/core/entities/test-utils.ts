export function testEntityCreation<Entity extends { id?: string }>(
    entityName: string,
    creatorFn: (source?: unknown) => Entity,
    validEntity: Entity,
) {
    describe(entityName, () => {
        it('should successfully create when valid source is passed', () => {
            expect(
                creatorFn(validEntity),
            ).toEqual(
                validEntity,
            );
        });

        it.each([
            undefined,
            null,
            {},
            { key: 'hello' },
        ])('should throw an error when invalid source (%s) is passed', (source) => {
            expect(() => creatorFn(source)).toThrowError();
        });

        it('should cast id given as number to string', () => {
            expect(
                creatorFn({
                    ...validEntity,
                    id: 1,
                }),
            ).toEqual({
                ...validEntity,
                id: '1',
            });
        });

        it('should remove unknown properties', () => {
            expect(
                creatorFn({
                    ...validEntity,
                    weirdStaff: 'oh',
                }),
            ).toEqual(
                validEntity,
            );
        });
    });
}
