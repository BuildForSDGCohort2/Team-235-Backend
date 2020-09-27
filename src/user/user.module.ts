import { forwardRef, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { UserRepository } from "./user.repository";
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { User } from "./user.model";
import { UserMapper } from "./user.mapper";
import { RoleModule } from "../role/role.module";

@Module({
  imports: [
    RoleModule,
    ObjectionModule.forFeature([User]),
  ],
  providers: [UserResolver, UserMapper, UserService, UserRepository],
  exports: [UserService, UserMapper]
})
export class UserModule { }
