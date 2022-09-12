import express from 'express';
import routes from './routes';
import cors from 'cors';

const apCors = cors({ origin: '*' });

const app = express();

app.use(apCors);
app.use(routes);
export { app };
