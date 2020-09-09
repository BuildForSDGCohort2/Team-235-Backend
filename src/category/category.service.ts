import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "./category.respository";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { User } from "src/user/user.model";
import { Category } from "./category.model";

@Injectable()
export class CategoryService {

    constructor(
        private readonly categoryRepository: CategoryRepository
    ) { }

    createCategory(currentUser: User, dto: CreateCategoryDTO) {

        const category = new Category();
        category.name = dto.name;
        category.createdBy = currentUser;
        
    }
}
