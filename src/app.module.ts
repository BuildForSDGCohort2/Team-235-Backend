import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { DatabaseModule } from "./shared/database/database.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UserModule } from "./user/user.module";
import { CategoryModule } from "./category/category.module";
import { RoleModule } from "./role/role.module";
import { StockModule } from "./stock/stock.module";

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV !== "production",
      playground: true,
      autoSchemaFile: true,
      introspection: true,
      context: ({ req }) => ({ req }),
    }),
    AuthenticationModule,
    UserModule,
    CategoryModule,
    RoleModule,
    StockModule,
  ],
  controllers: []
})
export class AppModule { }
