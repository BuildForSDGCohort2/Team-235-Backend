import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { CategoryDTO } from "./dto/category.dto";
import { CategoryService } from "./category.service";
import { CategoryMapper } from "./category.mapper";
import { CurrentUser } from "../authentication/current-user.decorator"
import { CreateCategoryDTO } from "./dto/create-category.dto";

import { GqlAuthGuard } from "../authentication/gql.auth.guard";
import { UseGuards } from "@nestjs/common";
import { User } from "../user/user.model"

@Resolver("Category")
@Resolver(() => CategoryDTO)
export class CategoryResolver {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly categoryMapper: CategoryMapper
    ) { }

    @Mutation(() => CreateCategoryDTO)
    @UseGuards(GqlAuthGuard)
    async createCategory(
        @Args("data") dto: CreateCategoryDTO, @CurrentUser() currentUser: User
    ) {
        const createdCategory = await this.categoryService.createCategory(currentUser, dto);
        return this.categoryMapper.mapFromModel(createdCategory);
    }


}
