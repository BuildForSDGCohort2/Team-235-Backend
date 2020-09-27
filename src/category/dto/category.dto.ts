import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType("Stock")
export class CategoryDTO {

    constructor(data: {
        id: number,
        name: string,
        createdAt: number
    }) {
        Object.assign(this, data);
    }

    @Field()
    id: number;

    @Field()
    name: string;


    @Field()
    createdAt: number;
}