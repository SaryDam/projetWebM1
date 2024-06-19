import { Field, ObjectType } from '@nestjs/graphql';
import { User} from "../../utilisateur/model/user.model";

@ObjectType()
export class LoginResponse {
    @Field()
    token: string;

    @Field(() => User)
    user: User;
}