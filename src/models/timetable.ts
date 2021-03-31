import { Group } from './group';
import { Lesson } from './lesson';
import { Subject } from './subject';
import { Teacher } from './teacher';

export type Timetable = {
    id: string;
    name: string;
    subjects: Subject[];
    teachers: Teacher[];
    groups: Group[];
    lessons: Lesson[];
};

export type TimetableWithoutId = Omit<Timetable, 'id'>;
