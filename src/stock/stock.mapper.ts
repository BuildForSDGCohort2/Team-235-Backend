import moment from "moment";
import { CategoryMapper } from "../category/category.mapper";
import { Mapper } from "src/shared/mapper/mapper";
import { StockDTO } from "./dto/stock.dto";
import { Stock } from "./stock.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StockMapper implements Mapper<StockDTO, Stock> {

    constructor(
        private readonly categoryMapper: CategoryMapper
    ){}

    mapFromModel(stock: Stock): StockDTO {
        return new StockDTO({
            id: stock.id,
            name: stock.name,
            quantity: stock.quantity,
            categories: stock.categories.map(category => {
                return this.categoryMapper.mapFromModel(category)
            }),
            createdAt: Number(moment(stock.createdAt).format("x")),
        });
    }

}