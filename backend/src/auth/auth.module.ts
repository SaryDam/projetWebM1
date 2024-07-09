import { Module, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from "./strategy/local-strategy";
import { PassportModule } from '@nestjs/passport';
import { UserModule } from "../utilisateur/user-module";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "./strategy/jwt-strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const secret = configService.get<string>('JWT_SECRET');
                const logger = new Logger('JwtModule');
                logger.log(`JWT_SECRET in JwtModule: ${secret}`);
                return {
                    secret: secret,
                    signOptions: { expiresIn: '60m' },
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
