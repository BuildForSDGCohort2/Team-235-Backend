import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CategoryService } from "../category/category.service";
import { MessageUtil } from "../shared/util/message.util";
import { User } from "../user/user.model";
import { CreateStockDTO } from "./dto/create-stock.dto";
import { Stock } from "./stock.model";
import { StockRepository } from "./stock.repository"
@Injectable()
export class StockService {



    constructor(
        private readonly categoryService: CategoryService,
        private readonly stockRepository: StockRepository
    ) { }

    async createStock(
        currentUser: User,
        dto: CreateStockDTO) {
        const stock = new Stock();

        if(!(dto && dto.name && dto.quantity && dto.categoryIds.length)){
            throw new BadRequestException(MessageUtil.INVALID_REQUEST_DATA);
        }

        if (await this.stockRepository.findByName(dto.name)) {
            throw new ConflictException(MessageUtil.STOCK_ALREADY_EXISTS);
        }
        stock.name = dto.name;
        stock.quantity = dto.quantity;
        stock.createdBy = currentUser;
        stock.categories = await Promise.all(
            dto.categoryIds.map(categoryId => {
                return this.categoryService.findById(categoryId)
            })
        )

        return await this.stockRepository.save(stock);
    }


    async findByName(name: string) {
        const stock = await this.stockRepository.findByName(name);
        if (stock === null) {
            throw new NotFoundException(MessageUtil.STOCK_NOT_FOUND);
        }
        return stock;
    }

    async findById(id: number) {
        const stock = await this.stockRepository.find(id);
        if (stock === null) {
            throw new NotFoundException(MessageUtil.STOCK_NOT_FOUND);
        }
        return stock;
    }

    async findAll() {
        return await this.stockRepository.findAll();
    }


    async getStocksByCategoryId(id: number): Promise<Stock[]> {
        return (await this.stockRepository.findAll())
        .filter(stock => {
            const filtered = stock.categories.filter(category => category.id == id);
            return filtered.length;
        })
    }

}
