import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../message/message.model';
import { Conversation } from '../conversation/conversation.model';

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field(type => [Message])
  messages: Message[];

  @Field(type => [Conversation])
  conversations: Conversation[];
}
