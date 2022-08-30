import { Request, Response } from 'express';
import UserService from '../services/user-services';

class GetUserController {
  private UserService = new UserService();

  public async handle(
    request: Request<string>,
    response: Response,
  ): Promise<Response> {
    try {
      console.log(request.params);
      const result = await this.UserService.getUser(request.params);
      return response.status(201).json({ result });
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { GetUserController };
