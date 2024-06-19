import { SendMessage} from "./send-message";
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMessage extends PartialType(SendMessage) {
    @Field(() => Int)
    id: number;
}