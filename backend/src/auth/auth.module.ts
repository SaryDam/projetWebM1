import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy} from "./strategy/local-strategy";
import { PassportModule } from '@nestjs/passport';
import { UserModule} from "../utilisateur/user-module";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy} from "./strategy/jwt-strategy";

@Module({
    imports: [
        PassportModule,
        UserModule,
        JwtModule.register({
            signOptions: { expiresIn: '3600s' },
            secret: process.env.JWT_SECRET,
        }),
    ],
    providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}