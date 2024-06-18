import {Inject, Injectable} from '@nestjs/common';
import {Redis} from 'ioredis';
import {Message} from './message.model';

@Injectable()
export class MessageService {
    constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {
    }

    async createMessage(message: Message): Promise<void> {
        await this.redis.hset('messages', message.id, JSON.stringify(message));
    }

    async getMessages(conversationId: string): Promise<Message[]> {
        const messages = await this.redis.hvals('messages');
        return messages
            .map((msg: string) => JSON.parse(msg))
            .filter((msg: Message) => msg.conversation.id === conversationId);
    }
}
