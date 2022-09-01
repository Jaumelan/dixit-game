import RedisClient from '.';

class User {
  private static instance: RedisClient;

  public insert(User: any) {
    const redis = RedisClient.getInstance();
    //console.log('user ', User);
    const { id, username, email, password } = User;
    const result = redis.hmset(id, {
      username,
      email,
      password,
    });

    return result;
  }

  public get(id: string): Promise<any> {
    const redis = RedisClient.getInstance();
    return new Promise((resolve, reject) => {
      //console.log('id ', id);
      redis.hgetall(id, (err, value) => {
        //console.log('value ', value);
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
