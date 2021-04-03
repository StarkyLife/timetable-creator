import { createSubject, Subject } from './subject';
import { testEntityCreation } from './test-utils';

const defaultSubject: Subject = {
    id: 'id',
    name: 'subject',
};

testEntityCreation(
    'Subject',
    createSubject,
    defaultSubject,
);
