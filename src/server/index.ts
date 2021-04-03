import { createTimetableInteractor } from '@src/core/timetable-interactor';
import { createMockTimetableGateway } from '@tests/doubles/mock-timetable-gateway';
import express from 'express';
import cors from 'cors';
import { createTimetableController } from './controllers/timetable-controller';

const app = express();
const port = 3000;
const timetableGateway = createMockTimetableGateway();
const timetableInteractor = createTimetableInteractor(timetableGateway);

app.use(express.json());
app.use(cors());

app.use(
    '/timetable',
    createTimetableController(timetableInteractor),
);

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Started server on port ${port}`);
});
