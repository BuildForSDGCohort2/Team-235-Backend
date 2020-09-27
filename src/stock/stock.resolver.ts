import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/authentication/current-user.decorator";
import { GqlAuthGuard } from "src/authentication/gql.auth.guard";
import { User } from "src/user/user.model";
import { CreateStockDTO } from "./dto/create-stock.dto";
import { StockDTO } from "./dto/stock.dto";
import { StockMapper } from "./stock.mapper";
import { StockService } from "./stock.service";

@Resolver("Stock")
@Resolver(() => StockDTO)
export class StockResolver {
    constructor(
        private readonly stockService: StockService,
        private readonly stockMapper: StockMapper
    ) { }



    @Mutation(() => StockDTO)
    @UseGuards(GqlAuthGuard)
    async createStock(
        @Args("data") dto: CreateStockDTO, @CurrentUser() currentUser: User
    ) {
        const createdStock = await this.stockService.createStock(currentUser, dto);
        return await this.stockMapper.mapFromModel(createdStock);
    }

    @Query(() => StockDTO)
    @UseGuards(GqlAuthGuard)
    async getStockByName(
        @Args("name") name: string,
    ) {
        return await this.stockService.findByName(name);
    }

    @Query(() => StockDTO)
    @UseGuards(GqlAuthGuard)
    async getStockById(
        @Args("id") id: number,
    ) {
        return await this.stockService.findById(id);
    }


    @Query(() => [StockDTO])
    @UseGuards(GqlAuthGuard)
    async getStock() {
        const categories = await this.stockService.findAll();

        let mappedCategories: StockDTO[] = [];

        for (const category of categories) {
            const mapped = await this.stockMapper.mapFromModel(category);
            mappedCategories.push(mapped);
        }

        return mappedCategories;
    }
}
