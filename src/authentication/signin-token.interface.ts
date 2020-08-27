import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class SignInToken {

  constructor(data: {
    accessToken: string,
    tokenType: string,
    expiresIn: number
  }){
    Object.assign(this, data);
  }

  @Field()
  accessToken: string;

  @Field()
  tokenType: string;

  @Field()
  expiresIn: number;


}

