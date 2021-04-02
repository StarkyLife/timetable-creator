import * as yup from 'yup';

type TeacherExpertise = {
    subjectId: string;
    load: number;
};

export type Teacher = {
    id: string;
    name: string;
    expertises: TeacherExpertise[];
    daysOff: number[];
};

const teacherExpertiseSchema = yup.object({
    subjectId: yup.string().required(),
    load: yup.number().required(),
});

export const teacherSchema = yup.object({
    id: yup.string().required(),
    name: yup.string().required(),
    expertises: yup.array(teacherExpertiseSchema).required(),
    daysOff: yup.array(yup.number().required()).required(),
}).required();

export function createTeacher(source?: unknown): Teacher {
    return teacherSchema.validateSync(source, { stripUnknown: true });
}
