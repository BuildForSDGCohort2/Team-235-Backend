import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { GqlAuthGuard } from "./gql.auth.guard";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from "./current-user.decorator";
import { User } from "../user/user.model";
import { SignInToken } from "./signin-token.interface";
import { LoginCredentialsDTO } from "./dto/login.credentials.dto";
import { AuthenticationService } from "./authentication.service";
import { UserDTO } from "src/user/dto/user.dto";

@Resolver(() => User)
export class AuthenticationResolver {
  constructor(
    private readonly authService: AuthenticationService
  ) {}

  @Mutation(() => SignInToken)
  async signin(
    @Args("data") dto: LoginCredentialsDTO,
  ): Promise<SignInToken> {
    return await this.authService.signIn(dto);
  }

}
