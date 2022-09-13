import User from '../clients/dao/redis/user';
import { UserDataValidator } from '../../src/validators';
import {
  UserModel,
  APIResponse,
  LoginRequisition,
  UpdateUserModel,
} from '../../src/models';

class UserService {
  private User = new User();
  private userValidator = UserDataValidator;

  public async createUser(User: UserModel): Promise<APIResponse> {
    console.log('User', User);
    const userValidated = new this.userValidator(User);

    if (userValidated.errors) {
      throw new Error(`400: ${userValidated.errors}`);
    }

    const userExists = await this.User.get(User.email);
    //console.log('userExists', userExists);

    if (Object.keys(userExists).length > 0) {
      throw new Error(`400: User already exists`);
    }

    const userComplete = {
      ...userValidated.user,
      profile: 'https://robohash.org/' + userValidated.user.email,
    };

    const result = await this.User.insert(userComplete);
    //console.log(result);

    if (result.result === 'OK') {
      const { User } = result;
      const data = {
        email: User.email,
        profilePicture: User.profile,
        username: User.username,
      };

      return {
        data,
        messages: [],
      } as APIResponse;
    } else {
      throw new Error(
        '500: an error occurred while inserting user on database',
      );
    }
  }

  public async loginUser(User: LoginRequisition): Promise<APIResponse> {
    //console.log('User', User.email);
    const userExists = await this.User.get(User.email);

    //console.log('userExists', userExists);

    if (Object.keys(userExists).length === 0) {
      throw new Error(`400: User not found`);
    }

    if (userExists.password !== User.password) {
      throw new Error(`400: Invalid password`);
    }

    const { username, email, profile } = userExists;

    const data = {
      username,
      email,
      profile,
    };

    return {
      data,
      messages: [],
    } as APIResponse;
  }

  public async getUser(id: string): Promise<any> {
    const result = await this.User.get(id);
    return { data: result, messages: [] };
  }

  public async deleteUser(id: string): Promise<any> {
    const result = await this.User.delete(id);
    return result;
  }

  public async updateUser(User: UpdateUserModel): Promise<APIResponse> {
    //const userValidated = new this.userValidator(User);
    await this.User.update(User);

    const result = await this.User.get(User.email);
    //console.log(result);
    return { data: result, messages: [] };
  }
}

export default UserService;
