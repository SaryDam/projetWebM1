import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class SendMessage {
    @Field()
    content: string;

    @Field(() => Int)
    conversationId: number;
}