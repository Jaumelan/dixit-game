import { Request, Response } from 'express';
import { GameServices } from '../services';
import { ResponseWriter } from '../utils';

class UpdateGameController {
  private GameServices = new GameServices();

  private responseWriter = ResponseWriter;

  public async handle(request: Request, response: Response): Promise<void> {
    try {
      const result = await this.GameServices.updateGameSession(
        request.params.id,
        request.body,
      );
      this.responseWriter.success(response, 201, result);
    } catch (error) {
      this.responseWriter.error(response, error as Error);
    }
  }
}

export { UpdateGameController };
