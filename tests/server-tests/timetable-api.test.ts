import { TimetableRepresentation } from '@src/core/representation-models/timetable-representation';
import { createTimetableInteractor } from '@src/core/timetable-interactor';
import { WebServer } from '@src/server';
import { createMockTimetableGateway } from '@tests/doubles/mock-timetable-gateway';
import axios from 'axios';

const PORT = 3000;
const EMPTY_TIMETABLE = { name: 'timetable' };

const webServer = new WebServer({ disableLogging: true });

const axiosInstance = axios.create({ baseURL: `http://localhost:${PORT}` });
const fetchers = {
    async saveTimetable(timetable: TimetableRepresentation) {
        const saveResponse = await axiosInstance.post('/timetable', timetable);

        return saveResponse.data;
    },
    async getListOfTimetables() {
        const getListRepsonse = await axiosInstance.get('/timetable');

        return getListRepsonse.data;
    },
    async getTimetableById(id: string) {
        const getByIdResponse = await axiosInstance.get(`/timetable/${id}`);

        return getByIdResponse.data;
    },
    async deleteTimetable(id: string) {
        await axiosInstance.delete(`/timetable/${id}`);
    },
};

beforeAll(async () => {
    const timetableGateway = createMockTimetableGateway();
    const timetableInteractor = createTimetableInteractor(timetableGateway);

    webServer.connectTimetableController(timetableInteractor);

    await webServer.start(PORT);
});

it('can SAVE timetable', async () => {
    const savedTimetable = await fetchers.saveTimetable(EMPTY_TIMETABLE);

    expect(savedTimetable).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: EMPTY_TIMETABLE.name,
    }));
});

it('can GET LIST of saved timetables', async () => {
    expect.assertions(1);

    const savedTimetable = await fetchers.saveTimetable(EMPTY_TIMETABLE);

    const timetables = await fetchers.getListOfTimetables();

    expect(timetables)
        .toEqual(expect.arrayContaining([savedTimetable]));
});

it('can GET timetable by ID', async () => {
    expect.assertions(1);

    const savedTimetable = await fetchers.saveTimetable(EMPTY_TIMETABLE);

    const foundTimetable = await fetchers.getTimetableById(savedTimetable.id);

    expect(foundTimetable).toEqual(savedTimetable);
});

it('can DELETE timetable', async () => {
    expect.assertions(1);

    const savedTimetable = await fetchers.saveTimetable(EMPTY_TIMETABLE);

    await fetchers.deleteTimetable(savedTimetable.id);

    try {
        await fetchers.getTimetableById(savedTimetable.id);
    } catch (error) {
        expect(error.response.status).toEqual(404);
    }
});

it('throws error when trying to save invalid data', async () => {
    expect.assertions(1);
    try {
        await fetchers.saveTimetable({ weird: 'staff' } as unknown as TimetableRepresentation);
    } catch (error) {
        expect(error.response.status).toEqual(500);
    }
});

afterAll(async () => {
    await webServer.stop();
});
