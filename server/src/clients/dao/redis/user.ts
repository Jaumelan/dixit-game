import RedisClient from '.';

class User {
  private static instance: RedisClient;

  public async insert(User: any): Promise<any> {
    const redis = RedisClient.getInstance();
    console.log('user ', User);
    const { id } = User;
    const result = await redis.set(id, JSON.stringify(User));
    return result;
  }

  public async get(id: string): Promise<any> {
    const redis = RedisClient.getInstance();
    const result = await redis.get(id);
    return result;
  }

  public async delete(id: string): Promise<any> {
    const redis = RedisClient.getInstance();
    const result = await redis.del(id);
    return result;
  }

  public async update(User: any): Promise<any> {
    const redis = RedisClient.getInstance();
    const { id } = User;
    const result = await redis.set(id, JSON.stringify(User));
    return result;
  }
}

export default User;
