import { User } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { AuthCredentialsDTO } from "../dto/auth.credentials.dto";
import {
  ConflictException,
  InternalServerErrorException,
  Injectable,
  Inject,
} from "@nestjs/common";

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
    console.log(user.password);

    console.log(JSON.stringify(authCredentialsDTO))
    try {

      // await user.save(); //for typeORM
      //todo Exception on saving
      await this.userModel.query().insertAndFetch(user);
    } catch (error) {
      console.log(error);
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
    if (user && user.validatePassword(password)) {
      return user.username;
    }

    return null;
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
