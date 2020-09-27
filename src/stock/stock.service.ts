import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { MessageUtil } from 'src/shared/util/message.util';
import { User } from 'src/user/user.model';
import { CreateStockDTO } from './dto/create-stock.dto';
import { Stock } from './stock.model';
import { StockRepository } from "./stock.repository"
@Injectable()
export class StockService {


    constructor(
        private readonly stockcategoryRepository: StockRepository
    ) { }

    async createStock(
        currentUser: User,
        dto: CreateStockDTO) {
        const stock = new Stock();

        if (await this.stockcategoryRepository.findByName(dto.name)) {
            throw new ConflictException(MessageUtil.STOCK_ALREADY_EXISTS);
        }
        stock.name = dto.name;
        stock.createdBy = currentUser;
        return await this.stockcategoryRepository.save(stock);
    }


    async findByName(name: string) {
        const stock = await this.stockcategoryRepository.findByName(name);
        if (stock === null) {
            throw new NotFoundException(MessageUtil.STOCK_NOT_FOUND);
        }
        return stock;
    }

    async findById(id: number) {
        const stock = await this.stockcategoryRepository.find(id);
        if (stock === null) {
            throw new NotFoundException(MessageUtil.STOCK_NOT_FOUND);
        }
        return stock;
    }

    async findAll() {
        return await this.stockcategoryRepository.findAll();
    }

}
