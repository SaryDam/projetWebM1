import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUser {
    @Field()
    username: string;

    @Field()
    password: string;
}