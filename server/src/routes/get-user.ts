import { Router } from 'express';
import { GetUserController } from '../controllers/get-user';

const route = Router();

route
  .route('/get-user/:id')
  .get(new GetUserController().handle.bind(new GetUserController()));

export default route;
