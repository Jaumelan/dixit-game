import { Router } from 'express';
import {
  CreateGameController,
  GetAvaliableGamesController,
  GetGameData,
  GetRoomController,
  GetCardsController,
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
/* route
  .route('/game/getcards/:quantity/:players/:gameid')
  .get(new GetCardsController().handle.bind(new GetCardsController())); */
route.route('/game/:id').get(new GetGameData().handle.bind(new GetGameData()));
route
  .route('/room')
  .get(new GetRoomController().handle.bind(new GetRoomController()));

export default route;
