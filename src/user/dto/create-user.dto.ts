import { InputType, Field, Int } from "@nestjs/graphql";

@InputType("UserInfo")
export class CreateUserDTO {

    @Field()
    readonly firstName: string

    @Field()
    readonly lastName: string

    @Field()
    readonly email: string

    @Field({nullable: true})
    readonly phoneNumber?: string

    @Field()
    readonly password: string

    @Field(() => [Int])
    readonly roleIds: number[]

}