import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';

@Module({
  providers: [RedisCacheService]
})
export class RedisCacheModule {}
