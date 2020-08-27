import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthConstants } from "./constants/constants";
import { AuthenticationController } from "./controllers/authentication.controller";
import { JwtStrategy } from "./strategies/passport.strategy";
import { AuthService } from "src/shared/authentication/auth.service";
import { GqlAuthGuard } from "./strategies/gql.auth.guard";
import { User } from "./entities/user.entity";
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { UserRepository } from "./repositories/user.repository";
import { AuthenticationResolver } from "./resolvers/authentication.resolver";

@Module({
    imports: [
        ObjectionModule.forFeature([User]),
        PassportModule.register({ session: true, defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: AuthConstants.secret,
            signOptions: {
                expiresIn: 3600,
            },
        }),
    ],
    controllers: [AuthenticationController],
    providers: [AuthService, JwtStrategy, GqlAuthGuard, UserRepository, AuthenticationResolver],
    exports: [JwtStrategy, PassportModule, GqlAuthGuard],
})
export class AuthenticationModule { }
