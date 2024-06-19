import { Injectable } from '@nestjs/common';
import { UserService} from "../utilisateur/user.service";
import { LoginUserInput} from "./dto/login-input";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOne(username);

        if (user) {
            const valid = await bcrypt.compare(password, user.password);

            if (valid) {
                const { password, ...result } = user;
                return result;
            }
        }

        return null;
    }

    async login(loginUserInput: LoginUserInput) {
        const user = await this.userService.findOne(loginUserInput.username);

        if (user) {
            const { password, ...result } = user;

            return {
                token: this.jwtService.sign({
                    username: user.username,
                    sub: user.id,
                }),
                user: result,
            };
        }

        return null;
    }

    async signup(loginUserInput: LoginUserInput) {
        const user = await this.userService.findOne(loginUserInput.username);

        if (user) {
            throw new Error('User already exists');
        }

        const password = await bcrypt.hash(loginUserInput.password, 10);

        return this.userService.create({
            ...loginUserInput,
            password,
        });
    }
}