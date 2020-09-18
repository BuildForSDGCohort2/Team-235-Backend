import { Field, InputType, Int } from "@nestjs/graphql";

@InputType("CreateRole")
export class CreateRoleDTO {

    @Field()
    name: string;

    @Field({
        nullable: true
    })
    description?: string;

    @Field(() => [Int])
    permissionIds: number[]

}