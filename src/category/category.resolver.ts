import { Resolver } from "@nestjs/graphql";
import { CategoryDTO } from "./dto/category.dto";

@Resolver("Category")
@Resolver(() => CategoryDTO)
export class CategoryResolver {



}
