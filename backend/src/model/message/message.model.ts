import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Utilisateur} from '../utilisateur/utilisateur.model';
import {Conversation} from '../conversation/conversation.model';
import {DateTimeResolver} from "graphql-scalars";

@ObjectType()
export class Message {
    @Field(() => ID)
    id: string;

    @Field(() => Utilisateur)
    auteur: Utilisateur;

    @Field()
    contenu: string;

    @Field(() => DateTimeResolver)
    dateEnvoi: Date;

    @Field(() => Conversation)
    conversation: Conversation;
}
