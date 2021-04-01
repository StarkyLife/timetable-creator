import * as yup from 'yup';

import { Group, groupSchema } from './group';
import { Subject, subjectSchema } from './subject';
import { Teacher, teacherSchema } from './teacher';

type TimetableLesson = {
    ordinalDayNumber: number;
    ordinalNumber: number;
    subjectId: string;
    teachersIds: string[];
    groupsIds: string[];
};

export type Timetable = {
    id?: string;
    name: string;
    subjects?: Subject[];
    teachers?: Teacher[];
    groups?: Group[];
    lessons?: TimetableLesson[];
};

const timetableLessonSchema = yup.object({
    ordinalDayNumber: yup.number().required(),
    ordinalNumber: yup.number().required(),
    subjectId: yup.string().required(),
    teachersIds: yup.array(yup.string().required()).min(1).required(),
    groupsIds: yup.array(yup.string().required()).min(1).required(),
}).required();

export const timetableSchema = yup.object({
    id: yup.string(),
    name: yup.string().required(),
    subjects: yup.array(subjectSchema),
    teachers: yup.array(teacherSchema),
    lessons: yup.array(timetableLessonSchema),
    groups: yup.array(groupSchema),
}).required();

export function createTimetable(source?: unknown): Timetable {
    return timetableSchema.validateSync(source, { stripUnknown: true });
}
