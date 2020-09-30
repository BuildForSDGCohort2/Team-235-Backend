import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/authentication/current-user.decorator";
import { GqlAuthGuard } from "src/authentication/gql.auth.guard";
import { PermissionGuard } from "src/role/permission.guard";
import { User } from "src/user/user.model";
import { CreateStockDTO } from "./dto/create-stock.dto";
import { StockDTO } from "./dto/stock.dto";
import { StockMapper } from "./stock.mapper";
import { StockService } from "./stock.service";

@Resolver(() => StockDTO)
export class StockResolver {
    constructor(
        private readonly stockService: StockService,
        private readonly stockMapper: StockMapper
    ) { }



    @Mutation(() => StockDTO)
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["stock.create"])
    )
    async createStock(
        @Args("data") dto: CreateStockDTO, @CurrentUser() currentUser: User
    ) {
        const createdStock = await this.stockService.createStock(currentUser, dto);
        return this.stockMapper.mapFromModel(createdStock);
    }

    @Query(() => StockDTO)
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["stock.read"])
    )
    async getStockByName(
        @Args("name") name: string,
    ) {
        return await this.stockService.findByName(name);
    }

    @Query(() => StockDTO)
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["stock.read"])
    )
    async getStockById(
        @Args("id") id: number,
    ) {
        return await this.stockService.findById(id);
    }


    @Query(() => [StockDTO])
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["stock.read"])
    )
    async getStocks() {
        const stocks = await this.stockService.findAll();
        return stocks.map((stock) => this.stockMapper.mapFromModel(stock));
    }

    @Query(() => [StockDTO])
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["stock.read"])
    )
    async getStocksByCategoryId(@Args("data") id: number) {
        return (await this.stockService.getStocksByCategoryId(id)).map((stock) => {
            return this.stockMapper.mapFromModel(stock);
        });
    }
}
