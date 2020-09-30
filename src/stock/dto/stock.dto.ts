import { ObjectType, Field } from "@nestjs/graphql";
import { CategoryDTO } from "../../category/dto/category.dto";

@ObjectType("Stock")
export class StockDTO {

    constructor(data: {
        id: number,
        name: string,
        quantity: number,
        categories: CategoryDTO[],
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

    @Field(() => [CategoryDTO])
    categories: CategoryDTO[]

    @Field()
    createdAt: number;
}