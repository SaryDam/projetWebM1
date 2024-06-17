import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Utilisateur {
  @Field(() => ID)
  id: string;

  @Field()
  nom: string;

  @Field()
  email: string;

  @Field()
  motDePasse: string;
}
