import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDTO } from 'src/authentication/dto/auth.credentials.dto';
import { AccessToken } from 'src/authentication/interfaces/accesstoken.interface';
import { JWTPayload } from 'src/authentication/interfaces/jwt.interface';
import { UserRepository } from 'src/authentication/repositories/user.repository';
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return await this.userRepository.signUp(authCredentialsDTO);
  }

  async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<AccessToken> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDTO,
    );

    if (!username) throw new UnauthorizedException('Invalid credentials');

    const payload: JWTPayload = {
      username: username,
    };

    console.log(username);

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
