import { Module } from "@nestjs/common";
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { CategoryModule } from "src/category/category.module";
import { DatabaseModule } from "src/shared/database/database.module";
import { UserModule } from "src/user/user.module";
import { StockMapper } from "./stock.mapper";
import { Stock } from "./stock.model";
import { StockRepository } from "./stock.repository";
import { StockResolver } from "./stock.resolver";
import { StockService } from "./stock.service";

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CategoryModule,
    ObjectionModule.forFeature([Stock])
  ],
  providers: [StockResolver, StockService, StockMapper, StockRepository]
})
export class StockModule { }
