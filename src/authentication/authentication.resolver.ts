import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { GqlAuthGuard } from "./gql.auth.guard";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from "./current-user.decorator";
import { User } from "../user/user.model";
import { SignInTokenDTO } from "./dto/signin-token.dto";
import { LoginCredentialsDTO } from "./dto/login-credentials.dto";
import { AuthenticationService } from "./authentication.service";
import { UserDTO } from "src/user/dto/user.dto";

@Resolver(() => User)
export class AuthenticationResolver {
  constructor(
    private readonly authService: AuthenticationService
  ) {}

  @Mutation(() => SignInTokenDTO)
  async signin(
    @Args("data") dto: LoginCredentialsDTO,
  ): Promise<SignInTokenDTO> {
    return await this.authService.signIn(dto);
  }

}
