import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { Conversation } from './conversation.model';
import { ConversationService } from './conversation.service';
import { Message } from '../message/message.model';

// src/conversation/conversation.resolver.ts

@Resolver(of => Conversation)
export class ConversationResolver {
  constructor(private conversationService: ConversationService) {}

  @Query(returns => Conversation)
  async conversation(@Args('id', { type: () => Int }) id: number) {
    return this.conversationService.getConversation(id);
  }

  @Query(returns => [Message])
  async conversationMessages(@Args('conversationId', { type: () => Int }) conversationId: number) {
    return this.conversationService.getConversationMessages(conversationId);
  }

  @Mutation(returns => Conversation)
  async createConversation(
      @Args('userIds', { type: () => [Int] }) userIds: number[],
      @Args('name') name: string,
  ) {
    return this.conversationService.createConversation(userIds, name);
  }
}
