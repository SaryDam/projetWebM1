import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { User } from './user.model';
import { UserService } from './user.service';
import { Conversation } from "../conversation/conversation.model";

@Resolver(of => User)
export class UserResolver {
  constructor(private userService: UserService) {}


  @Query(returns => [User])
  async users() {
    return this.userService.getAllUsers();
  }

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


  @Mutation(returns => User, { nullable: true })
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }



}
