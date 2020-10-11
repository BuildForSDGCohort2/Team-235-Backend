import { Injectable, UnauthorizedException, BadRequestException, ForbiddenException, Inject, forwardRef } from "@nestjs/common";
import bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { LoginCredentialsDTO } from "src/authentication/dto/login-credentials.dto";
import { SignInTokenDTO } from "./dto/signin-token.dto";
import { UserService } from "../user/user.service";
import { MessageUtil } from "../shared/util/message.util";
import { ValidationUtil } from "../shared/util/validation.util";
import { JWTPayload } from "./jwt-payload.interface";


@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) { }


  async signIn(dto: LoginCredentialsDTO): Promise<SignInTokenDTO> {

    if (!(dto.email && dto.password)) {
      throw new BadRequestException(MessageUtil.INVALID_REQUEST_DATA);
    }

    const errors: Record<string, string> = {};

    if (!ValidationUtil.isValidEmail(dto.email)) {
      errors["email"] = MessageUtil.INVALID_EMAIL_ADDRESS;
    }

    if (!ValidationUtil.isValidPassword(dto.password)) {
      errors["password"] = MessageUtil.INVALID_PASSWORD;
    }

    if(Object.keys(errors).length){
      throw new BadRequestException(errors);
    }

    const user = await this.userService.findByEmail(dto.email);

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException(MessageUtil.INVALID_CREDENTIALS);
    }

    if(user.blocked){
      throw new ForbiddenException(MessageUtil.PERMISSION_DENIED);
    } 
  
    const payload: JWTPayload = {
      sub: user.id
    };

    return new SignInTokenDTO({
      accessToken: this.jwtService.sign(payload),
      tokenType: "Bearer",
      expiresIn: Number(process.env.JWT_EXPIRES_IN)
    });

  }
}
