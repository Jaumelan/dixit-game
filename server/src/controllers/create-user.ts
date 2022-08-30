import { Request, Response } from 'express';
import UserService from '../services/user-services';

class CreateUserController {
  private UserService = new UserService();

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      console.log(request.body);
      const result = await this.UserService.createUser(request.body);
      return response.status(201).json({ result });
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateUserController };
