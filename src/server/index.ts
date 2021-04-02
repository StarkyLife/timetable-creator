import * as express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (_req, res) => res.send('Hello world!'));

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Started server on port ${port}`);
});
