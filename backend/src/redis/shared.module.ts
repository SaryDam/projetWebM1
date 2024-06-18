import { Module } from '@nestjs/common';
import Redis from 'ioredis';

const redisClient = new Redis({
    host: 'localhost',
    port: 6379,
});

@Module({
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useValue: redisClient,
        },
    ],
    exports: ['REDIS_CLIENT'],
})
export class SharedModule {}
