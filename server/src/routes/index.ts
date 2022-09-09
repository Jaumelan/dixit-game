import express from 'express';
import CreateUserRoute from './user-routes';
import CardsRoute from './cards';
import GameRoute from './game-routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(CreateUserRoute);
app.use(CardsRoute);
app.use(GameRoute);

export default app;
