import User from '../clients/dao/redis/user';

class UserService {
  private User = new User();

  public async createUser(User: any): Promise<any> {
    const result = await this.User.insert(User);
    return result;
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
