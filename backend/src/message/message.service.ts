import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PUB_SUB } from '../common/pub-sub.module';
import { PubSub } from 'graphql-subscriptions';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Message } from '@prisma/client';

@Injectable()
export class MessageService {
  private pendingMessages = new Map<string, (value: Message | PromiseLike<Message>) => void>();

  constructor(
      public prisma: PrismaService,
      @Inject(PUB_SUB) private pubSub: PubSub,
      @InjectQueue('message-queue') private messageQueue: Queue,
  ) {}

  async getMessage(id: number): Promise<Message> {
    return this.prisma.message.findUnique({ where: { id } });
  }

  async sendMessage(userId: number, conversationId: number, content: string): Promise<Message> {
    const job = await this.messageQueue.add('sendMessage', {
      userId,
      conversationId,
      content,
    });

    const messagePromise = new Promise<Message>((resolve) => {
      this.pendingMessages.set(job.id.toString(), resolve);
    });

    console.log('Adding job to queue');

    return messagePromise;
  }

  resolveMessage(jobId: string, message: Message) {
    const resolve = this.pendingMessages.get(jobId);
    if (resolve) {
      resolve(message);
      this.pendingMessages.delete(jobId);
    }
  }
}
