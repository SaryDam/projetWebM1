import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NewConversation {
    @Field(() => [Number])
    participantIds: number[];
}
