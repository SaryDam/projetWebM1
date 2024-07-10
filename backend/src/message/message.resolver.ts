import { Resolver, Query, Args, Int, Mutation, Subscription } from "@nestjs/graphql";
import { Message } from './message.model';
import { MessageService } from './message.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import {PubSub} from "graphql-subscriptions";
import {Inject} from "@nestjs/common";

@Resolver(of => Message)
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Query(returns => Message)
  async message(@Args('id', { type: () => Int }) id: number) {
    return this.messageService.getMessage(id);
  }


  /*
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
    this.pubSub.publish('messageAdded', { messageAdded: result });
    return result;
  }
*/

  @Mutation(returns => Message)
  async sendMessage(
      @Args('userId', { type: () => Int }) userId: number,
      @Args('conversationId', { type: () => Int }) conversationId: number,
      @Args('content') content: string,
  ) {
    return this.messageService.sendMessage(userId, conversationId, content);
  }

  @Subscription(returns => Message, {
    filter: (payload, variables, context) => {
      return payload.messageAdded.conversationId === variables.conversationId;
    },
  })
  messageAdded(@Args('conversationId', { type: () => Int }) conversationId: number) {
    return this.pubSub.asyncIterator('messageAdded');
  }
}
