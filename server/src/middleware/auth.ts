import jwt from 'jsonwebtoken';
import { config } from '../config';

class AuthService {
  public async validateToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      return decoded;
    } catch (err) {
      throw new Error('401: Invalid token');
    }
  }
}

export default AuthService;
