import { Module } from "@nestjs/common";
import { CategoryResolver } from "./category.resolver";
import { CategoryMapper } from "./category.mapper"
import { Category } from "./category.model";
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { DatabaseModule } from "src/shared/database/database.module";
import { CategoryRepository } from "./category.respository";
import { CategoryService } from "./category.service";
import { User } from "src/user/user.model";

@Module({
  imports: [
    DatabaseModule,
    ObjectionModule.forFeature([Category, User])
  ],
  providers: [CategoryResolver, CategoryService, CategoryMapper, CategoryRepository],
  exports: []
})
export class CategoryModule { }
