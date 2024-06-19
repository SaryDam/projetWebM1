import {Field, Int, ObjectType} from '@nestjs/graphql';
import {Message} from '../../message/model/message.model';
import {User} from '../../utilisateur/model/user.model';

@ObjectType()
export class Conversation {
    @Field(() => Int)
    id: number;

    @Field(() => [User])
    participants: User[];

    @Field(() => [Message])
    messages: Message[];
}
