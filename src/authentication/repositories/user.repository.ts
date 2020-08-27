import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDTO } from '../dto/auth.credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UserRepository {

  constructor(
    @Inject(User)
    private readonly userModel: typeof User
  ) {

  }

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO;

    //Gend salt
    const salt = await bcrypt.genSalt();
    // console.log(salt);
    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);
    // console.log(user.password);
    try {
      //todo use return user
      // await user.save();
      await this.userModel.query().insertAndFetch(user);
    } catch (error) {
      // console.log(error.code);
      if (error) {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<string> {
    const { username, password } = authCredentialsDTO;


    const user = (await this.userModel.query().findOne({ username }));
    // const user = await this.findOne({ username });
    // console.log(username + ' ' + password);
    if (user && user.validatePassword(password)) {
      return user.username;
    }

    return null;
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
