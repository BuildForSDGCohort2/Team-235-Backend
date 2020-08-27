
import * as bcrypt from 'bcrypt';
import { type } from 'os';
import { ObjectType, Field } from '@nestjs/graphql';
import { Model } from 'objection';

@ObjectType()
export class User extends Model {

  static tableName = "users";

  @Field()
  id: number;

  @Field()
  username: string;

  @Field()
  password: string;

  salt: string;


  public async validatePassword(password: string): Promise<boolean> {
    const hash = bcrypt.hash(password, this.salt);

    return hash === password;
  }
}
