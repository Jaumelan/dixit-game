import RedisClient from '.';
import { UserRedis, UpdateUserModel } from '../../../models';

class User {
  private static instance: RedisClient;

  public async insert(User: UserRedis) {
    const redis = RedisClient.getInstance();
    //console.log('user ', User);
    const { username, email, password, profile } = User;
    const result = await redis.hmset(email, {
      username,
      email,
      password,
      profile,
    });

    return { result, User };
  }

  public async get(id: string): Promise<any> {
    const redis = RedisClient.getInstance();

    const result = await redis.hgetall(id);
    //console.log(Object.keys(result).length);
    return result;
  }
  /*
    return new Promise((resolve, reject) => {
      redis.hgetall(id, (err, value) => {
        if (err) reject(err);
        else {
          console.log('value', value);
          resolve(value);
        }
      });
    });
    /*
    const result = await redis.hgetall(id, (err, res) => {
      if (err) {
        console.log(err);
      }

      return res;
    });
    return result; 
  }
  */

  public async delete(id: string): Promise<any> {
    const redis = RedisClient.getInstance();
    const keys = await redis.hkeys(id);
    //const result = await redis.hdel(id, keys);
    return keys; //result;
  }

  public async update(User: UpdateUserModel): Promise<any> {
    // console.log('User', User);
    const redis = RedisClient.getInstance();
    const { email } = User;
    if (User.username) {
      const result = await redis.hset(email, 'username', User.username);
      return result;
    }
    if (User.password) {
      const result = await redis.hset(email, 'password', User.password);
      return result;
    }
  }
}

export default User;
