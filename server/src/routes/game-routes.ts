import { Router } from 'express';
import {
  CreateGameController,
  GetAvaliableGamesController,
  GetGameData,
  GetRoomController,
  UpdateGameController,
} from '../controllers';

const route = Router();

route
  .route('/game/create')
  .post(new CreateGameController().handle.bind(new CreateGameController()));
route
  .route('/game/availables/:id')
  .get(
    new GetAvaliableGamesController().handle.bind(
      new GetAvaliableGamesController(),
    ),
  );
route
  .route('/update/:id')
  .put(new UpdateGameController().handle.bind(new UpdateGameController()));
route.route('/game/:id').get(new GetGameData().handle.bind(new GetGameData()));
route
  .route('/room/:id')
  .get(new GetRoomController().handle.bind(new GetRoomController()));

export default route;
