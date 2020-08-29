import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./passport.strategy";
import { AuthenticationService } from "src/authentication/authentication.service";
import { GqlAuthGuard } from "./gql.auth.guard";
import { AuthenticationResolver } from "./authentication.resolver";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: String(process.env.JWT_SECRET),
            signOptions: {
                expiresIn: Number(process.env.JWT_EXPIRES_IN),
            },
        }),
        UserModule,
    ],
    providers: [AuthenticationService, JwtStrategy, GqlAuthGuard, AuthenticationResolver],
    exports: [JwtStrategy, PassportModule, GqlAuthGuard],
})
export class AuthenticationModule { }
