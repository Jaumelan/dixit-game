import { Request, Response } from 'express';
import { convertImagesToBase64 } from '../utils';

class CardsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { cardsNumber } = request.params;
      const cardsBase64 = convertImagesToBase64(cardsNumber);
      return response.status(201).json({ cardsBase64 });
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CardsController };
