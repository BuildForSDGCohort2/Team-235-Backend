import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { CategoryDTO } from "./dto/category.dto";
import { CategoryService } from "./category.service";
import { CategoryMapper } from "./category.mapper";
import { CurrentUser } from "../authentication/current-user.decorator";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { GqlAuthGuard } from "../authentication/gql.auth.guard";
import { UseGuards } from "@nestjs/common";
import { User } from "../user/user.model";

@Resolver("Category")
@Resolver(() => CategoryDTO)
export class CategoryResolver {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly categoryMapper: CategoryMapper
    ) { }

    @Mutation(() => CategoryDTO)
    @UseGuards(GqlAuthGuard)
    async createCategory(
        @Args("data") dto: CreateCategoryDTO, @CurrentUser() currentUser: User
    ) {
        const createdCategory = await this.categoryService.createCategory(currentUser, dto);
        return await this.categoryMapper.mapFromModel(createdCategory);
    }

    @Query(() => CategoryDTO)
    @UseGuards(GqlAuthGuard)
    async findByName(
        @Args("name") name: string,
    ) {
        return await this.categoryService.findByName(name);
    }

    @Query(() => CategoryDTO)
    @UseGuards(GqlAuthGuard)
    async find(
        @Args("id") id: number,
    ) {
        return await this.categoryService.findById(id);
    }


    @Query(() => [CategoryDTO])
    @UseGuards(GqlAuthGuard)
    async allCategory() {
        const categories = await this.categoryService.findAll();

        let mappedCategories: CategoryDTO[] = [];

        for (const category of categories) {
            const mapped = await this.categoryMapper.mapFromModel(category);
            mappedCategories.push(mapped);
        }

        return mappedCategories;
    }

}
