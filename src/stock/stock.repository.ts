
import { Repository } from "src/shared/repository/repository";
import { Injectable, Inject } from "@nestjs/common";
import { Stock } from "./stock.model";

@Injectable()
export class StockRepository implements Repository<number, Stock> {

    constructor(
        @Inject(Stock)
        private readonly stockModel: typeof Stock
    ) { }

    async find(id: number): Promise<Stock> {
        return await this.stockModel.query().findById(id)
            .withGraphFetched("[createdBy, updatedBy]");
    }
    async findByName(name: string): Promise<Stock> {
        return await this.stockModel.query().findOne({ name })
            .withGraphFetched("[createdBy, updatedBy]");
    }

    async findAll(): Promise<Stock[]> {
        return await this.stockModel.query()
            .withGraphFetched("[createdBy, updatedBy]");
    }

    async save(stock: Stock): Promise<Stock> {
        return await this.stockModel.query().upsertGraphAndFetch(stock, { relate: ["createdBy", "updatedBy"] });
    }

    async remove(stock: Stock): Promise<void> {
        await this.stockModel.query().delete().where(stock);
    }

}