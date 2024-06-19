import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessage {
    @Field()
    content: string;

    @Field(() => Int)
    userId: number;

    @Field(() => Int)
    conversationId: number;
}