import { Request, Response } from 'express';
import UserService from '../services/user-services';
import { ResponseWriter } from '../utils';

class LoginUserController {
  private UserService = new UserService();

  private responseWriter = ResponseWriter;

  public async handle(request: Request, response: Response): Promise<void> {
    try {
      const result = await this.UserService.loginUser(request.body);
      //console.log('result login', result);
      this.responseWriter.success(response, 200, result);
    } catch (error) {
      this.responseWriter.error(response, error as Error);
    }
  }
}

export { LoginUserController };
