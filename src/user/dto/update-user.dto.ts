import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateUserDTO } from "./create-user.dto";

@InputType("UpdateUserInput")
export class UpdateUserDTO extends PartialType(CreateUserDTO){

    @Field()
    readonly id: string

}