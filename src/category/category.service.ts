import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
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
        dto: CreateCategoryDTO) {
        const category = new Category();

        if (await this.categoryRepository.findByName(dto.name)) {
            throw new ConflictException(MessageUtil.EXIST_CATEGORY_NAME);
        }
        category.name = dto.name;
        category.createdBy = currentUser;
        return await this.categoryRepository.save(category);
    }


    async findByName(name: string) {
        const category = await this.categoryRepository.findByName(name);
        if (category === null) {
            throw new NotFoundException(MessageUtil.CATEGORY_NOT_FOUND);
        }
        return category;
    }

    async findById(id: number) {
        const category = await this.categoryRepository.find(id);
        if (category === null) {
            throw new NotFoundException(MessageUtil.CATEGORY_NOT_FOUND);
        }
        return category;
    }

    async findAll() {
        return await this.categoryRepository.findAll();
    }
}
