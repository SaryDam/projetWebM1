import {Field, ObjectType} from '@nestjs/graphql';
import {Message} from '../message/message.model';
import {Utilisateur} from '../utilisateur/utilisateur.model';

@ObjectType()
export class Conversation {
    @Field()
    id: string;

    @Field(() => [Utilisateur])
    participants: Utilisateur[];

    @Field(() => [Message], {nullable: true})
    messages?: Message[];
}
