import { Request, Response } from 'express';
import UserService from '../services/user-services';

class GetUserController {
  private UserService = new UserService();

  public async handle(
    request: Request<{ id: string }>,
    response: Response,
  ): Promise<Response> {
    try {
      const result = await this.UserService.getUser(request.params.id);
      return response.status(201).json({ ...result });
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { GetUserController };
