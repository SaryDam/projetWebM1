import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Conversation } from '../conversation/conversation.model';

@ObjectType()
export class Message {
  @Field(type => Int)
  id: number;

  @Field()
  content: string;

  @Field()
  timestamp: Date;

  @Field(type => User)
  user: User;

  @Field(type => Conversation)
  conversation: Conversation;
}
