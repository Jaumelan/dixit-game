import { Router } from 'express';
import { CardsController } from '../controllers/cards';

const route = Router();

route
  .route('/cards/:cardsNumber')
  .get(new CardsController().handle.bind(new CardsController()));

export default route;
