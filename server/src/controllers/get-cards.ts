import { Request, Response } from 'express';
import { GameServices } from '../services';
import { ResponseWriter } from '../utils';

class GetCardsController {
  private GameServices = new GameServices();

  private responseWriter = ResponseWriter;

  public async handle(request: Request, response: Response): Promise<void> {
    try {
      //console.log(request.params);
      const { players } = request.params;
      const result = await this.GameServices.getCards(Number(players));
      this.responseWriter.success(response, 201, result);
    } catch (error) {
      this.responseWriter.error(response, error as Error);
    }
  }
}

export { GetCardsController };
