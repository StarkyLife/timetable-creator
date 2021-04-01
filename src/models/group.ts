import * as yup from 'yup';

type GroupWorkload = {
    subjectId: string;
    load: number;
    difficulty: number;
    maxForDay: number;
    requiredTeachersCount: number;
    attachedTeachersIds: string[];
};

export type Group = {
    id: string;
    name: string;
    type: string;
    workload: GroupWorkload[];
};

const groupWorkloadSchema = yup.object({
    subjectId: yup.string().required(),
    load: yup.number().required(),
    difficulty: yup.number().required(),
    maxForDay: yup.number().required(),
    requiredTeachersCount: yup.number().required(),
    attachedTeachersIds: yup.array(yup.string().required()).min(1).required(),
}).required();

export const groupSchema = yup.object({
    id: yup.string().required(),
    name: yup.string().required(),
    type: yup.string().required(),
    workload: yup.array(groupWorkloadSchema).required(),
}).required();

export function createGroup(source?: unknown): Group {
    return groupSchema.validateSync(source, { stripUnknown: true });
}
