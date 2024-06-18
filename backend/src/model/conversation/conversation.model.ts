import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Utilisateur} from '../utilisateur/utilisateur.model';
import {Message} from '../message/message.model';
import {DateTimeResolver} from "graphql-scalars";

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

  @Field(() => DateTimeResolver)
  dateDerniereMiseAJour: Date;
}
