import express from 'express';
import CreateUserRoute from './create-user';
import GetUserRoute from './get-user';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(CreateUserRoute);
app.use(GetUserRoute);

export default app;
