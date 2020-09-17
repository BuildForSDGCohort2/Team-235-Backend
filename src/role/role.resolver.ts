import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { RoleDTO } from "./dto/role.dto";
import { CreateRoleDTO } from "./dto/create-role.dto";
import { RoleService } from "./role.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/authentication/gql.auth.guard";
import { CurrentUser } from "src/authentication/current-user.decorator";
import { User } from "src/user/user.model";
import { RoleMapper } from "./role.mapper";
import { PermissionDTO } from "./dto/permission.dto";
import { PermissionMapper } from "./permission.mapper";
import { PermissionGuard as PermissionGuard } from "./permission.guard";
import { UpdateRoleDTO } from "./dto/update-role.dto";
import { ModifyRolePermissionsDTO } from "./dto/modify-role-permissions.dto";

@Resolver(() => [PermissionDTO, RoleDTO])
export class RoleResolver {

    constructor(
        private readonly roleService: RoleService,
        private readonly permissionMapper: PermissionMapper,
        private readonly roleMapper: RoleMapper,
    ){}

    @Query(() => [PermissionDTO])
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["permissions.read"])
    )
    async getPermissions(){
        return (await this.roleService.getPermissions())
        .map(permission => this.permissionMapper.mapFromModel(permission));
    }

    @Query(() => [RoleDTO])
    @UseGuards(
        GqlAuthGuard, 
        PermissionGuard(["roles.read"])
    )
    async getRoles(){
        return (await this.roleService.getRoles())
        .map(role => this.roleMapper.mapFromModel(role));
    }

    @Mutation(() => RoleDTO)
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["roles.create"])
    )
    async createRole(@Args("data") dto: CreateRoleDTO, @CurrentUser() currentUser: User){
        const role = await this.roleService.create(dto, currentUser);
        return this.roleMapper.mapFromModel(role);
    }

    @Mutation(() => RoleDTO)
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["roles.update"])
    )
    async updateRole(@Args("data") dto: UpdateRoleDTO, @CurrentUser() currentUser: User){
        const role = await this.roleService.update(dto, currentUser);
        return this.roleMapper.mapFromModel(role);
    }


    @Mutation(() => RoleDTO)
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["roles.update"])
    )
    async addPermissionsToRole(@Args("data") dto: ModifyRolePermissionsDTO, @CurrentUser() currentUser: User){
        const role = await this.roleService.addPermissionsToRole(dto, currentUser);
        return this.roleMapper.mapFromModel(role);
    }


    @Mutation(() => RoleDTO)
    @UseGuards(
        GqlAuthGuard,
        PermissionGuard(["roles.update"])
    )
    async removePermissionsFromRole(@Args("data") dto: ModifyRolePermissionsDTO, @CurrentUser() currentUser: User){
        const role = await this.roleService.removePermissionsFromRole(dto, currentUser);
        return this.roleMapper.mapFromModel(role);
    }
    

}
