import { CreateRoleDTO } from "./create-role.dto";
import { Field, InputType, Int } from "@nestjs/graphql";

@InputType("UpdateRole")
export class UpdateRoleDTO{
    @Field()
    id: number

    @Field({
        nullable: true
    })
    name: string;

    @Field({
        nullable: true
    })
    description?: string;
}