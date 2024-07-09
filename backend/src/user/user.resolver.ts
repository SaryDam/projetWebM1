import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { User } from './user.model';
import { UserService } from './user.service';
import { Conversation } from "../conversation/conversation.model";

@Resolver(of => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(returns => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUser(id);
  }

  @Mutation(returns => User)
  async createUser(
    @Args('email') email: string,
    @Args('name') name: string,
    @Args('password') password: string,
  ) {
    return this.userService.createUser(email, name, password);
  }

  @Query(returns => [Conversation])
  async userConversations(@Args('userId', { type: () => Int }) userId: number) {
    return this.userService.getUserConversations(userId);
  }
}
