import { InputType, Field, Int } from "@nestjs/graphql";

@InputType("ModifyRolePermissionsInput")
export class ModifyRolePermissionsDTO {

    @Field()
    roleId: number;

    @Field(() => [Int])
    permissionIds: number[];

}