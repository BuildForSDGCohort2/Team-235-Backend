import { ObjectType, Field } from "@nestjs/graphql";
import { PermissionDTO } from "./permission.dto";

@ObjectType("Role")
export class RoleDTO {

    constructor(data: {
        id: number,
        name: string,
        description: string,
        permissions: PermissionDTO[]
        createdAt: number
    }){
        Object.assign(this, data);
    }
    
    @Field()
    id: number;

    @Field()
    name: string;

    @Field({nullable: true})
    description: string;

    @Field(() => [PermissionDTO])
    permissions: PermissionDTO[];

    @Field()
    createdAt: number;

}