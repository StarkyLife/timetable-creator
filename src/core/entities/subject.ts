import * as yup from 'yup';

export type Subject = {
    id: string;
    name: string;
};

export const subjectSchema = yup.object({
    id: yup.string().required(),
    name: yup.string().required(),
}).required();

export function createSubject(source?: unknown): Subject {
    return subjectSchema.validateSync(source, { stripUnknown: true });
}
