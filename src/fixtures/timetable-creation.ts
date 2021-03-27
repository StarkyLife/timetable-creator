export const TimetableCreation = {
    createTeacher(name: string, expertises: Array<{ name: string; load: number }>) {
        console.log(name, expertises);
        throw new Error('Not implemented');
    },
    createSubject(name: string, options?: { requiredTeachersCount: number }) {
        console.log(name, options);
        throw new Error('Not implemented');
    },
    createGroup(name: string, workload: Array<{ subject: string; load: number; attachedTeachers: string[] }>) {
        console.log(name, workload);
        throw new Error('Not implemented');
    },
    createTimetable(options: { classPerDay: number }) {
        console.log(options);

        return [];
    },
};
