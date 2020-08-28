import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { UserRepository } from "./user.repository";
import { DatabaseModule } from 'src/shared/database/database.module';
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { User } from "./user.model";
import { UserMapper } from "./user.mapper";

@Module({
  imports: [
    DatabaseModule,
    ObjectionModule.forFeature([User])
  ],
  providers: [UserResolver, UserMapper, UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
