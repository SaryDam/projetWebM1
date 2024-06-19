import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput} from "./dto/login-input";
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard} from "./guard/gql-auth";
import { LoginResponse} from "./dto/login";
import { User} from "../utilisateur/model/user.model";

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
        return this.authService.login(loginUserInput);
    }

    @Mutation(() => User)
    signup(@Args('loginUserInput') loginUserInput: LoginUserInput) {
        return this.authService.signup(loginUserInput);
    }
}