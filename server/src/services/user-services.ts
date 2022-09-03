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

    const userExists = await this.User.get(User.email);

    if (userExists) {
      throw new Error(`400: User already exists`);
    }

    const result = await this.User.insert(userValidated.user);

    if (result) {
      const data = {
        created: true,
      };

      return {
        data,
        messages: ['user created successfully'],
      } as APIResponse;
    } else {
      throw new Error(
        '500: an error occurred while inserting user on database',
      );
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
