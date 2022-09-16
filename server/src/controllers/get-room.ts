import { Request, Response } from 'express';
import { GameServices } from '../services';
import { ResponseWriter } from '../utils';
import AuthService from '../middleware/auth';

class GetRoomController {
  private GameServices = new GameServices();

  private AuthService = new AuthService();

  private responseWriter = ResponseWriter;

  public async handle(request: Request, response: Response): Promise<void> {
    try {
      const data = await this.AuthService.validateToken(
        request.headers['x-access-token'] as string,
      );

      if (data.email !== request.params.id) {
        throw new Error('401: Invalid token');
      }
      const result = await this.GameServices.sendNumber();
      this.responseWriter.success(response, 200, result);
    } catch (error) {
      this.responseWriter.error(response, error as Error);
    }
  }
}

export { GetRoomController };
