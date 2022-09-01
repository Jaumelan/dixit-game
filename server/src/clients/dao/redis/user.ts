import RedisClient from '.';
import { UserModel } from '../../../models';

class User {
  private static instance: RedisClient;

  public insert(User: UserModel) {
    const redis = RedisClient.getInstance();
    console.log('user ', User);
    const { username, email, password } = User;
    const result = redis.hmset(email, {
      username,
      email,
      password,
    });

    return result;
  }

  public async get(id: string): Promise<any> {
    const redis = RedisClient.getInstance();
    return new Promise((resolve, reject) => {
      redis.hgetall(id, (err, value) => {
        if (err) reject(err);
        else resolve(value);
      });
    });
    /*
    const result = await redis.hgetall(id, (err, res) => {
      if (err) {
        console.log(err);
      }

      return res;
    });
    return result; */
  }

  public async delete(id: string): Promise<any> {
    const redis = RedisClient.getInstance();
    const keys = await redis.hkeys(id);
    //const result = await redis.hdel(id, keys);
    return keys; //result;
  }

  public async update(User: any): Promise<any> {
    const redis = RedisClient.getInstance();
    const { id } = User;
    const result = await redis.set(id, JSON.stringify(User));
    return result;
  }
}

export default User;
