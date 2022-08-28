import { Redis } from 'ioredis';
import { config } from '../../../config';

export class RedisClient {
  private static instance: Redis;

  public static getInstance(): Redis {
    if (!RedisClient.instance) {
      RedisClient.instance = new Redis(config.db);
    }

    return RedisClient.instance;
  }
}
