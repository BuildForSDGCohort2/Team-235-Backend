import { Injectable } from "@nestjs/common";
import moment from "moment";
import { Mapper } from "src/shared/mapper/mapper";
import { Category } from "./category.model";
import { CategoryDTO } from "./dto/category.dto";

@Injectable()
export class CategoryMapper implements Mapper<CategoryDTO, Category> {
    mapFromModel(category: Category): CategoryDTO {
        return new CategoryDTO({
            id: category.id,
            name: category.name,
            createdAt: Number(moment(category.createdAt).format("x")),
        });
    }

}