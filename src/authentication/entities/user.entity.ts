
import * as bcrypt from "bcrypt";
import { ObjectType, Field } from "@nestjs/graphql";
import { Model } from "objection";
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

  static get idColumn() {
    return "id";
  }

  public async validatePassword(password: string): Promise<boolean> {
    const hash = bcrypt.hash(password, this.salt);

    return hash === password;
  }
}
