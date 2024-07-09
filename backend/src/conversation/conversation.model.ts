import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Message } from '../message/message.model';

@ObjectType()
export class Conversation {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => [User])
  users: User[];

  @Field(type => [Message])
  messages: Message[];
}
