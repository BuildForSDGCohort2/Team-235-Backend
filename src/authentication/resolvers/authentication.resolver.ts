import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { GqlAuthGuard } from "../strategies/gql.auth.guard";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from "../decorators/get-user-decorator";
import { User } from "../entities/user.entity";
import { AccessToken } from "../interfaces/accesstoken.interface";
import { AuthCredentialsDTO } from "../dto/auth.credentials.dto";
import { AuthService } from "src/shared/authentication/auth.service";

@Resolver((of) => User)
export class AuthenticationResolver {
  constructor(readonly authService: AuthService) {
    //   do something to the autheservice
  }
  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User): User {
    console.log(`This is the user ${user}`);
    return user;
  }

  @Mutation((returns) => String, {
    name: "signin",
    description: "Returns token after login",
  })
  async signin(
    @CurrentUser() user: User,
    @Args("authCredentialsDTO", { type: () => AuthCredentialsDTO }) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<string> {
    console.log(`This is the user ${JSON.stringify(user)}`);
    const access = await this.authService.signIn(authCredentialsDTO);
    return access.accessToken;
  }


  @Mutation((returns) => User, {
    name: "Signup",
    description: "Creates a User Account",
  })
  signup(
    @CurrentUser() user: User,
    @Args("authCredentialsDTO", { type: () => AuthCredentialsDTO }) authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDTO);
  }
}
