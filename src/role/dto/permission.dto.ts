import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType("Permission")
export class PermissionDTO {
    constructor(data: {
        id: number,
        value: string,
        description: string
    }){
        Object.assign(this, data);
    }

    @Field()
    id: number;

    @Field()
    value: string;

    @Field()
    description: string;

}