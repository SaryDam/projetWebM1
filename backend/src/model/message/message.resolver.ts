import { Resolver, Query, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.model';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [Message])
  getMessages(@Args('conversationId') conversationId: string): Message[] {
    return this.messageService.findByConversation(conversationId);
  }
}
