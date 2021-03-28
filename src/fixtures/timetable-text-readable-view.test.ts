import { createTimetableReadableView } from './timetable-text-readable-view';

describe('Creation of readable timetable view', () => {
    it('should create view with 1 class and 1 lesson', () => {
        expect(
            createTimetableReadableView([{
                teachers: ['teacher'],
                subject: 'english',
                group: '9a',
                lesson: 1,
                dayOfWeek: 1,
            }]),
        ).toEqual([
            [
                'Monday',
                '1 | english | teacher',
            ],
        ]);
    });

    it('should create view with 2 classes and 2 days with 2 lessons each', () => {
        expect(
            createTimetableReadableView([
                {
                    teachers: ['teacher'],
                    subject: 'russian',
                    group: '9a',
                    lesson: 1,
                    dayOfWeek: 1,
                },
                {
                    teachers: ['teacher'],
                    subject: 'math',
                    group: '9a',
                    lesson: 2,
                    dayOfWeek: 1,
                },
                {
                    teachers: ['teacher'],
                    subject: 'math',
                    group: '9a',
                    lesson: 1,
                    dayOfWeek: 2,
                },
                {
                    teachers: ['teacher'],
                    subject: 'english',
                    group: '9a',
                    lesson: 2,
                    dayOfWeek: 2,
                },
                {
                    teachers: ['Olya'],
                    subject: 'chemisty',
                    group: '10a',
                    lesson: 1,
                    dayOfWeek: 1,
                },
                {
                    teachers: ['Olya'],
                    subject: 'english',
                    group: '10a',
                    lesson: 2,
                    dayOfWeek: 1,
                },
                {
                    teachers: ['Olya'],
                    subject: 'english',
                    group: '10a',
                    lesson: 1,
                    dayOfWeek: 2,
                },
                {
                    teachers: ['Olya'],
                    subject: 'physics',
                    group: '10a',
                    lesson: 2,
                    dayOfWeek: 2,
                },
            ]),
        ).toEqual([
            [
                'Monday',
                '1 | russian | teacher',
                '2 | math | teacher',
                'Tuesday',
                '1 | math | teacher',
                '2 | english | teacher',
            ],
            [
                'Monday',
                '1 | chemisty | Olya',
                '2 | english | Olya',
                'Tuesday',
                '1 | english | Olya',
                '2 | physics | Olya',
            ],
        ]);
    });
});
