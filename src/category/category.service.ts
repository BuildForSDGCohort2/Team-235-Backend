import { Injectable, ConflictException } from "@nestjs/common";
import { CategoryRepository } from "./category.respository";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { User } from "src/user/user.model";
import { Category } from "./category.model";
import { MessageUtil } from "src/shared/util/message.util";

@Injectable()
export class CategoryService {

    constructor(
        private readonly categoryRepository: CategoryRepository
    ) { }

    async createCategory(
        currentUser: User,
        dto: CreateCategoryDTO): Promise<Category> {

        const category = new Category();

        if (await this.categoryRepository.findByName(dto.name)) {
            throw new ConflictException(MessageUtil.EXIST_CATEGORY_NAME);
        }
        category.name = dto.name;
        category.createdBy = currentUser;

        return category;
    }

}
