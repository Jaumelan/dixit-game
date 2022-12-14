import { Request, Response } from 'express';
import UserService from '../services/user-services';
import AuthService from '../middleware/auth';

class GetUserController {
  private UserService = new UserService();

  private AuthService = new AuthService();

  public async handle(
    request: Request<{ id: string }>,
    response: Response,
  ): Promise<Response> {
    try {
      const data = await this.AuthService.validateToken(
        request.headers['x-access-token'] as string,
      );

      //('data', data);
      if (data.email !== request.params.id) {
        throw new Error('401: Invalid token');
      }

      const result = await this.UserService.getUser(request.params.id);
      return response.status(201).json({ ...result });
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { GetUserController };
