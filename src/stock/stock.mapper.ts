import moment from "moment";
import { Mapper } from "../shared/mapper/mapper";
import { StockDTO } from "./dto/stock.dto";
import { Stock } from "./stock.model";

export class StockMapper implements Mapper<StockDTO, Stock> {
    mapFromModel(stock: Stock): StockDTO {
        return new StockDTO({
            id: stock.id,
            name: stock.name,
            quantity: stock.quantity,
            createdAt: Number(moment(stock.createdAt).format("x")),
        });
    }

}