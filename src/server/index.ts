import express from 'express';
import cors from 'cors';
import { TimetableInteractor } from '@src/core/timetable-interactor-types';
import { Server } from 'http';
import { createTimetableController } from './controllers/timetable-controller';

export class WebServer {
    private app: ReturnType<typeof express>;

    private server: Server | undefined;

    // eslint-disable-next-line no-console
    private logger: (typeof console.log) | null = console.log;

    constructor(config?: { disableLogging?: boolean }) {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());

        if (config?.disableLogging) this.logger = null;
    }

    connectTimetableController(timetableInteractor: TimetableInteractor) {
        this.app.use(
            '/timetable',
            createTimetableController(timetableInteractor),
        );
    }

    start(port: number) {
        return new Promise<void>((resolve) => {
            this.server = this.app.listen(port, () => {
                // eslint-disable-next-line no-console
                this.logger?.(`Started server on port ${port}`);
                resolve();
            });
        });
    }

    stop() {
        return new Promise<void>((resolve) => {
            if (this.server) this.server.close(() => resolve());
            else resolve();
        });
    }
}
