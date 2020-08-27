import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthConstants } from './constants/constants';
import { AuthenticationController } from './controllers/authentication.controller';
import { JwtStrategy } from './strategies/passport.strategy';
import { AuthService } from 'src/shared/authentication/auth.service';
import { GqlAuthGuard } from './strategies/gql.auth.guard';

@Module({
    imports: [

        PassportModule.register({ session: true, defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: AuthConstants.secret,
            signOptions: {
                expiresIn: 3600,
            },
        }),
    ],
    controllers: [AuthenticationController],
    providers: [AuthService, JwtStrategy, GqlAuthGuard],
    exports: [JwtStrategy, PassportModule, GqlAuthGuard],
})
export class AuthenticationModule { }
