import User from '../clients/dao/redis/user';
import { UserDataValidator } from '../validators';
import { UserModel, APIResponse } from '../models';

class UserService {
  private User = new User();
  private userValidator = UserDataValidator;

  public async createUser(User: UserModel): Promise<APIResponse> {
    const userValidated = new this.userValidator(User);

    if (userValidated.errors) {
      throw new Error(`400: ${userValidated.errors}`);
    }

    const result = await this.User.insert(userValidated);

    if (result) {
      const data = {
        created: true,
      };

      return {
        data,
        messages: ['user created successfully'],
      } as APIResponse;
    } else {
      throw new Error('400: user already exists');
    }
  }

  public async getUser(id: string): Promise<any> {
    const result = await this.User.get(id);
    return result;
  }

  public async deleteUser(id: string): Promise<any> {
    const result = await this.User.delete(id);
    return result;
  }

  public async updateUser(User: any): Promise<any> {
    const result = await this.User.update(User);
    return result;
  }
}

export default UserService;
