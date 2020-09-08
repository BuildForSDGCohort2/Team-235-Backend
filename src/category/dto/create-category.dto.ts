import { InputType, Field } from "@nestjs/graphql";

@InputType("CategoryInfo")
export class CreateUserDTO {

    @Field()
    readonly name: string

    @Field()
    readonly imageUrl: string

}