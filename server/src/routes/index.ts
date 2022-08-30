import express from 'express';
import CreateUserRoute from './user-routes';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(CreateUserRoute);

export default app;
