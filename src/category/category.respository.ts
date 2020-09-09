import { Category } from "./category.model";
import { Repository } from "src/shared/repository/repository";
import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class CategoryRepository implements Repository<String, Category> {

    constructor(
        @Inject(Category)
        private readonly categoryModel: typeof Category
    ) { }

    async find(id: string): Promise<Category> {
        return await this.categoryModel.query().findById(id)
            .withGraphFetched("[createdBy, updatedBy]");
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryModel.query()
            .withGraphFetched("[createdBy, updatedBy]");
    }

    async save(category: Category): Promise<Category> {
        return await this.categoryModel.query().upsertGraphAndFetch(category, { relate: ["createdBy", "updatedBy"] });
    }

    async remove(category: Category): Promise<void> {
        await this.categoryModel.query().delete().where(category);
    }

}