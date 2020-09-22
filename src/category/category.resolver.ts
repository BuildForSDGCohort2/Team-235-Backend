import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { CategoryDTO } from "./dto/category.dto";
import { CategoryService } from "./category.service";
import { CategoryMapper } from "./category.mapper";
import { CurrentUser } from "../authentication/current-user.decorator";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { GqlAuthGuard } from "../authentication/gql.auth.guard";
import { UseGuards } from "@nestjs/common";
import { User } from "../user/user.model";
import { PermissionGuard } from "src/role/permission.guard";

@Resolver(() => CategoryDTO)
export class CategoryResolver {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly categoryMapper: CategoryMapper
    ) { }

    @Mutation(() => CategoryDTO)
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["categories.create"])
    )
    async createCategory(
        @Args("data") dto: CreateCategoryDTO, @CurrentUser() currentUser: User
    ) {
        const createdCategory = await this.categoryService.createCategory(currentUser, dto);
        return await this.categoryMapper.mapFromModel(createdCategory);
    }

    @Query(() => CategoryDTO)
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["categories.read"])
    )

    async getCategoryByName(
        @Args("name") name: string,
    ) {
        return await this.categoryService.findByName(name);
    }

    @Query(() => CategoryDTO)
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["categories.read"])
    )
    async getCategoryById(
        @Args("id") id: number,
    ) {
        return await this.categoryService.findById(id);
    }


    @Query(() => [CategoryDTO])
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["categories.read"])
    )
    async getCategories() {
        const categories = await this.categoryService.findAll();

        let mappedCategories: CategoryDTO[] = [];

        for (const category of categories) {
            const mapped = await this.categoryMapper.mapFromModel(category);
            mappedCategories.push(mapped);
        }

        return mappedCategories;
    }

}
