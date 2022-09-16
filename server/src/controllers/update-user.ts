import { Request, Response } from 'express';
import { UserServices } from '../services';
import { ResponseWriter } from '../utils';
import AuthService from '../middleware/auth';

class UpdateUserController {
  private UserServices = new UserServices();

  private AuthService = new AuthService();

  private responseWriter = ResponseWriter;

  public async handle(request: Request, response: Response): Promise<void> {
    try {
      const data = await this.AuthService.validateToken(
        request.headers['x-access-token'] as string,
      );

      //console.log(request.body);

      if (data.email !== request.body.email) {
        throw new Error('401: Invalid token');
      }

      const result = await this.UserServices.updateUser(request.body);
      this.responseWriter.success(response, 201, result);
      //return response.status(201).json({ result });
    } catch (error) {
      this.responseWriter.error(response, error as Error);
      //return response.status(400).json({ error: error.message });
    }
  }
}

export { UpdateUserController };
