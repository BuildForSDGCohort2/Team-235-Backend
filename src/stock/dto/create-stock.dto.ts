import { InputType, Field } from "@nestjs/graphql";

@InputType("StockInfo")
export class CreateStockDTO {

    @Field()
    readonly name: string

    @Field()
    readonly quantity: string
}