import { InputType, Field } from "@nestjs/graphql";

@InputType("LoginCredentials")
export class LoginCredentialsDTO {
  
  @Field()
  email: string;

  @Field()
  password: string;
}
