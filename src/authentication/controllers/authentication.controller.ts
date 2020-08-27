import { Controller, ValidationPipe, Get, Body, Post } from "@nestjs/common";
import { AuthCredentialsDTO } from "../dto/auth.credentials.dto";
import { AuthService } from "src/shared/authentication/auth.service";
import { AccessToken } from "../interfaces/accesstoken.interface";

@Controller("auth")
export class AuthenticationController {
    constructor(readonly authService: AuthService) {
        //   do something to the autheservice
    }
    @Post("/signup")
    signup(
        @Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO,
    ): Promise<void> {
        return this.authService.signUp(authCredentialsDTO);
    }

    @Get("/signin")
    signin(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<AccessToken> {
        return this.authService.signIn(authCredentialsDTO);
    }

}
