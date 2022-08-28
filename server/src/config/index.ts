import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 8080, // default port to listen
  db: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(String(process.env.REDIS_PORT), 10) || 6379,
    password: process.env.REDIS_PASSWORD || '',
  },
};
