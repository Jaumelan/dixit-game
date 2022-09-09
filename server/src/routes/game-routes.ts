import { Router } from 'express';
import {
  CreateGameController,
  GetAvaliableGamesController,
  GetGameData,
} from '../controllers';

const route = Router();

route
  .route('/game/create')
  .post(new CreateGameController().handle.bind(new CreateGameController()));
route
  .route('/game/availables')
  .get(
    new GetAvaliableGamesController().handle.bind(
      new GetAvaliableGamesController(),
    ),
  );
route.route('/game/:id').get(new GetGameData().handle.bind(new GetGameData()));

export default route;
