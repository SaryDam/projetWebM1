import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { Message } from './message.model';
import { MessageService } from './message.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Resolver(of => Message)
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    @InjectQueue('message') private messageQueue: Queue,
  ) {}

  @Query(returns => Message)
  async message(@Args('id', { type: () => Int }) id: number) {
    return this.messageService.getMessage(id);
  }

  @Mutation(returns => Message)
  async sendMessage(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('conversationId', { type: () => Int }) conversationId: number,
    @Args('content') content: string,
  ) {
    console.log('Adding job to queue');
    const job = await this.messageQueue.add('sendMessage', { userId, conversationId, content });

    console.log('Waiting for job to complete');
    const result = await job.finished();

    if (typeof result.timestamp === 'string') {
      result.timestamp = new Date(result.timestamp);
    }

    console.log('Job completed', result);
    return result;
  }
}
