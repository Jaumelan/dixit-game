import { Request, Response } from 'express';

class CreateAccountController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;
      return response.status(201).json({ name, email, password });
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateAccountController };
