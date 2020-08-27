import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { LoginCredentialsDTO } from "src/authentication/dto/login.credentials.dto";
import { SignInToken } from "./signin-token.interface";
import { UserService } from "../user/user.service";
import { MessageUtil } from "../shared/util/message.util";
import { ValidationUtil } from "../shared/util/validation.util";
import { JWTPayload } from "./jwt-payload.interface";


@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }


  async signIn(dto: LoginCredentialsDTO): Promise<SignInToken> {


    if (!(dto.email && dto.password)) {
      throw new BadRequestException(MessageUtil.INVALID_REQUEST_DATA);
    }

    const errors: Record<string, string> = {};

    if (!ValidationUtil.isValidEmail(dto.email)) {
      errors["email"] = MessageUtil.INVALID_EMAIL_ADDRESS
    }

    if (!ValidationUtil.isValidPassword(dto.password)) {
      errors["password"] = MessageUtil.INVALID_PASSWORD;
    }

    if(Object.keys(errors).length){
      throw new BadRequestException(errors);
    }

    const user = await this.userService.findByEmail(dto.email);

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException(MessageUtil.INVALID_CREDENTIALS)
    }

  
    const payload: JWTPayload = {
      sub: user.id
    };

    return new SignInToken({
      accessToken: this.jwtService.sign(payload),
      tokenType: "Bearer",
      expiresIn: Number(process.env.JWT_EXPIRES_IN)
    })

  }
}
