import { NewConversation } from './new-conversation';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class ModifyConversation extends PartialType(
    NewConversation,
) {
    @Field(() => Number)
    conversationId: number;
}
