import { createMockTimetableGateway } from '@tests/doubles/mock-timetable-gateway';
import { createTimetableInteractor } from './core/timetable-interactor';
import { WebServer } from './server';

const webServer = new WebServer();

const timetableGateway = createMockTimetableGateway();
const timetableInteractor = createTimetableInteractor(timetableGateway);

webServer.connectTimetableController(timetableInteractor);

webServer.start(3000);
