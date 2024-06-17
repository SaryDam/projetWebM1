import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Utilisateur } from '../utilisateur/utilisateur.model';
import { Message } from '../message/message.model';

@ObjectType()
export class Conversation {
  @Field(() => ID)
  id: string;

  @Field(() => [Utilisateur])
  participants: Utilisateur[];

  @Field(() => [Message])
  messages: Message[];

  @Field()
  dernierMessage: string;

  @Field()
  dateDerniereMiseAJour: Date;
}
