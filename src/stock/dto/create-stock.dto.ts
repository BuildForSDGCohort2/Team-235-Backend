import { InputType, Field, Int } from "@nestjs/graphql";

@InputType("StockInfo")
export class CreateStockDTO {

    @Field()
    readonly name: string

    @Field()
    readonly quantity: number

    @Field(() => [Int])
    readonly categoryIds: number[]
}