import groupBy from 'lodash/groupBy';
import { TestRepresentableTimetableItem } from './timetable-creation';

const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

export function createTimetableReadableView(testTimetable: TestRepresentableTimetableItem[]): string[][] {
    const groupedByClass = groupBy(testTimetable, 'group');

    return Object.values(groupedByClass).map((slotsGroupedByClass) => {
        const groupedByDayOfWeek = groupBy(slotsGroupedByClass, 'dayOfWeek');

        return Object.values(groupedByDayOfWeek).reduce((rows, slotsGroupedByDay) => {
            rows.push(daysOfWeek[slotsGroupedByDay[0].dayOfWeek - 1]);

            slotsGroupedByDay.forEach((s) => {
                rows.push(`${s.lesson} | ${s.subject} | ${s.teachers.join('/')}`);
            });

            return rows;
        }, [] as string[]);
    });
}
