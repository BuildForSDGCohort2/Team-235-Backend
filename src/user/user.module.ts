import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { UserRepository } from "./user.repository";
import { DatabaseModule } from "../shared/database/database.module";
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { User } from "./user.model";
import { UserMapper } from "./user.mapper";
import { RoleModule } from "src/role/role.module";

@Module({
  imports: [
    ObjectionModule.forFeature([User]),
    RoleModule
  ],
  providers: [UserResolver, UserMapper, UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
