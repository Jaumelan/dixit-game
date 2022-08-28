import { Redis } from 'ioredis';
import { config } from '../../../config';

class RedisClient {
  private static instance: Redis;

  public static getInstance(): Redis {
    if (!RedisClient.instance) {
      const redis = new Redis(config.db);
      RedisClient.instance = redis;
    }

    return RedisClient.instance;
  }
}
export default RedisClient;
