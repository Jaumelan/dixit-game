import { Router } from 'express';
import { CreateUserController } from '../controllers/create-user';
const route = Router();

route
  .route('/create-user/')
  .post(new CreateUserController().handle.bind(new CreateUserController()));

export default route;
