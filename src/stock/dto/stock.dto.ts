import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType("Category")
export class StockDTO {

    constructor(data: {
        id: number,
        name: string,
        quantity: number,
        createdAt: number
    }) {
        Object.assign(this, data);
    }

    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    quantity: number;


    @Field()
    createdAt: number;
}