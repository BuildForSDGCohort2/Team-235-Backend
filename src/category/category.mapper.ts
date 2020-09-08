import moment from "moment";
import { Mapper } from "src/shared/mapper/mapper";
import { Category } from "./category.model";
import { CategoryDTO } from "./dto/category.dto";

export class UserMapper implements Mapper<CategoryDTO, Category> {
    mapFromModel(category: Category): CategoryDTO {
        return new CategoryDTO({
            id: category.id,
            name: category.name,
            imageUrl: category.imageUrl,
            createdAt: Number(moment(category.createdAt).format("x")),
        });
    }

}