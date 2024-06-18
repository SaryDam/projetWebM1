import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Utilisateur {
  @Field()
  id: string;

  @Field()
  nom: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  motDePasse?: string;
}
