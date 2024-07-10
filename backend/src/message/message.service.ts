import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PUB_SUB } from '../common/pub-sub.module';
import { PubSub } from 'graphql-subscriptions';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Message } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(
      public prisma: PrismaService,
      @Inject(PUB_SUB) private pubSub: PubSub,
      @InjectQueue('message-queue') private messageQueue: Queue,
  ) {}

  async getMessage(id: number): Promise<Message> {
    return this.prisma.message.findUnique({ where: { id } });
  }
  async sendMessage(userId: number, conversationId: number, content: string): Promise<Message> {
    const message = await this.prisma.message.create({
      data: {
        content,
        user: { connect: { id: userId } },
        conversation: { connect: { id: conversationId } },
      },
    });

    await this.messageQueue.add('sendMessage', {
      userId,
      conversationId,
      content,
    });

    this.pubSub.publish('messageAdded', { messageAdded: message });

    return message;
  }
}
