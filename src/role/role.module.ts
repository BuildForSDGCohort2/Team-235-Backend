import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleResolver } from "./role.resolver";
import { ObjectionModule } from "@willsoto/nestjs-objection";
import { Role } from "./role.model";
import { RoleRepository } from "./role.repository";
import { RoleMapper } from "./role.mapper";
import { PermissionRepository } from "./permission.repository";
import { PermissionMapper } from "./permission.mapper";
import { Permission } from "./permission.model";

@Module({
  imports: [
    ObjectionModule.forFeature([Role, Permission])
  ],
  providers: [
    RoleService, 
    RoleRepository, 
    RoleMapper, 
    RoleResolver, 
    PermissionRepository, 
    PermissionMapper
  ],
  exports: [RoleMapper, RoleRepository]
})
export class RoleModule {}
