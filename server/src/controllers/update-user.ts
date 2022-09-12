import { Request, Response } from 'express';
import { UserServices } from '../services';
import { ResponseWriter } from '../utils';

class UpdateUserController {
  private UserServices = new UserServices();

  private responseWriter = ResponseWriter;

  public async handle(request: Request, response: Response): Promise<void> {
    try {
      //console.log(request.body);
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
