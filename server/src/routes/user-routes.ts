import { Router } from 'express';
import {
  CreateUserController,
  GetUserController,
  LoginUserController,
} from '../controllers';

const route = Router();

route
  .route('/user/register')
  .post(new CreateUserController().handle.bind(new CreateUserController()));
route
  .route('/user/login')
  .post(new LoginUserController().handle.bind(new LoginUserController()));
route
  .route('/user/:id')
  .get(new GetUserController().handle.bind(new GetUserController()));

export default route;
