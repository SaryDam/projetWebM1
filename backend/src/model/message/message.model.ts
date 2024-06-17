import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Utilisateur } from '../utilisateur/utilisateur.model';
import { Conversation } from '../conversation/conversation.model';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Field(() => Utilisateur)
  auteur: Utilisateur;

  @Field()
  contenu: string;

  @Field()
  dateEnvoi: Date;

  @Field(() => Conversation)
  conversation: Conversation;
}
