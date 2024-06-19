import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService} from "./user.service";
import { User } from "./model/user.model";

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User], { name: 'users' })
    findAll() {
        return this.userService.findAll();
    }

    @Query(() => User, { name: 'user' })
    findOne(@Args('username') username: string) {
        return this.userService.findOne(username);
    }
}