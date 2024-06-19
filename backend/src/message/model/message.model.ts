import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Conversation} from "../../conversation/model/conversation.model";
import { User} from "../../utilisateur/model/user.model";

@ObjectType()
export class Message {
    @Field(() => Int)
    id: number;

    @Field()
    content: string;

    @Field()
    createdAt: Date;

    @Field(() => User)
    author: User;

    @Field(() => Conversation)
    conversation: Conversation;
}