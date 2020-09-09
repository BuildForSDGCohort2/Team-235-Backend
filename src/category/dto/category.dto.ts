import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType("Category")
export class CategoryDTO {

    constructor(data: {
        id: string,
        name: string,
        createdAt: number
    }) {
        Object.assign(this, data);
    }

    @Field()
    id: string;

    @Field()
    name: string;


    @Field()
    createdAt: number;
}