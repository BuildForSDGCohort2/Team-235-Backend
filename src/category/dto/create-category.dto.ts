import { InputType, Field } from "@nestjs/graphql";

@InputType("CategoryInfo")
export class CreateCategoryDTO {

    @Field()
    readonly name: string
}