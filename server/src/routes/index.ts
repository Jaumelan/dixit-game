import express from 'express';
import CreateUserRoute from './create-user';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(CreateUserRoute);

export default app;
