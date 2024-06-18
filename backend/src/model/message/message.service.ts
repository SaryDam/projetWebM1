import { Injectable, Inject, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { Message } from './message.model';

@Injectable()
export class MessageService {
    private readonly logger = new Logger(MessageService.name);

    constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

    async createMessage(message: Message): Promise<void> {
        this.logger.log(`Storing message in Redis: ${JSON.stringify(message)}`);
        await this.redis.hset('messages', message.id, JSON.stringify(message));
    }

    async getMessages(conversationId: string): Promise<Message[]> {
        this.logger.log(`Retrieving messages for conversation ${conversationId} from Redis`);
        const messages = await this.redis.hvals('messages');
        return messages
            .map((msg: string) => JSON.parse(msg))
            .filter((msg: Message) => msg.conversation.id === conversationId);
    }
}
