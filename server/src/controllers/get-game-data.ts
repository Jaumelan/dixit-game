import { Request, Response } from 'express';
import { GameServices } from '../services';
import { ResponseWriter } from '../utils';

class GetGameData {
  private GameServices = new GameServices();

  private responseWriter = ResponseWriter;

  public async handle(request: Request, response: Response): Promise<void> {
    try {
      const result = await this.GameServices.getGameSession(request.params.id);
      this.responseWriter.success(response, 200, result);
      //return response.status(201).json({ result });
    } catch (error) {
      this.responseWriter.error(response, error as Error);
      //return response.status(400).json({ error: error.message });
    }
  }
}

export { GetGameData };
