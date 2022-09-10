import { Request, Response } from 'express';
import { GameServices } from '../services';
import { ResponseWriter } from '../utils';

class GetRoomController {
  private GameServices = new GameServices();

  private responseWriter = ResponseWriter;

  public async handle(request: Request, response: Response): Promise<void> {
    try {
      const result = await this.GameServices.sendNumber();
      this.responseWriter.success(response, 200, result);
    } catch (error) {
      this.responseWriter.error(response, error as Error);
    }
  }
}

export { GetRoomController };
