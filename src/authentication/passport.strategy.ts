import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "../user/user.model";
import { UserRepository } from "../user/user.repository";
import { JWTPayload } from "./jwt-payload.interface";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: String(process.env.JWT_SECRET),
    });
  }

  async validate(payload: JWTPayload): Promise<User> {
    const user = await this.userService.getProfile(payload.sub);
    console.log(user);
    return user;
  }
}
