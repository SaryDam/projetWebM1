import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Conversation} from "../../conversation/model/conversation.model";
import { Message} from "../../message/model/message.model";

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  photoProfil: string;

  @Field()
  createdAt: Date;

  @Field(() => [Conversation])
  conversations: Conversation[];

  @Field(() => [Message])
  messages: Message[];
}