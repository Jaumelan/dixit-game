import { Router } from 'express';
import { CreateUserController } from '../controllers/create-user';
import { GetUserController } from '../controllers/get-user';

const route = Router();

route
  .route('/user/register')
  .post(new CreateUserController().handle.bind(new CreateUserController()));
route
  .route('/user/:id')
  .get(new GetUserController().handle.bind(new GetUserController()));

export default route;
