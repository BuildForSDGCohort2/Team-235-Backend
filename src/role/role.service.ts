import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import _ from "lodash";
import { RoleRepository } from "./role.repository";
import { CreateRoleDTO } from "./dto/create-role.dto";
import { User } from "../user/user.model";
import { Role } from "./role.model";
import { MessageUtil } from "src/shared/util/message.util";
import { PermissionRepository } from "./permission.repository";
import { Permission } from "./permission.model";
import { UpdateRoleDTO } from "./dto/update-role.dto";
import { ModifyRolePermissionsDTO } from "./dto/modify-role-permissions.dto";

@Injectable()
export class RoleService {
    
    constructor(
        private readonly roleRepository: RoleRepository,
        private readonly permissionRepository: PermissionRepository
    ){}

    async getPermissions(): Promise<Permission[]> {
        const permissions = await this.permissionRepository.findAll();
        return permissions;
    }

    async getRoles(): Promise<Role[]>{
        return await this.roleRepository.findAll();
    }

    async create(dto: CreateRoleDTO, currentUser: User){

        const errors: Record<string, string> = {};

        if(!(dto.name && dto.permissionIds.length)){
            throw new BadRequestException(MessageUtil.INVALID_REQUEST_DATA);
        }

        const existingRole = await this.roleRepository.findByName(dto.name);
        if(existingRole){
            errors["name"] = MessageUtil.ROLE_ALREADY_EXISTS;
        }

        if(Object.keys(errors).length){
            throw new BadRequestException(errors);
        }

        const role = new Role();
        role.name = dto.name,
        role.permissions = [];
        role.description = dto.description;
        role.createdBy = currentUser;

        role.permissions = await Promise.all(dto.permissionIds.map(async permissionId => {
            return this.permissionRepository.find(permissionId);
        }))

        return await this.roleRepository.save(role);
    }

    async update(dto: UpdateRoleDTO, currentUser: User): Promise<Role>{
    
        if(!(dto.id && dto.name)){
            throw new BadRequestException(MessageUtil.INVALID_REQUEST_DATA);
        }

        const role = await this.roleRepository.find(dto.id);

        if(!role){
            throw new NotFoundException(MessageUtil.ROLE_NOT_FOUND);
        }

        role.updatedBy = currentUser;

        return await this.roleRepository.save(
            _.merge(role, dto)
        );
    }

    async addPermissionsToRole(dto: ModifyRolePermissionsDTO, currentUser: User): Promise<Role>{
        if(!(dto.roleId && dto.permissionIds.length)){
            throw new BadRequestException(MessageUtil.INVALID_REQUEST_DATA);
        }

        const role = await this.roleRepository.find(dto.roleId);
        if(!role){
            throw new NotFoundException(MessageUtil.ROLE_NOT_FOUND);
        }

        role.permissions = role.permissions.concat(await Promise.all(dto.permissionIds.map(async permissionId => {
            console.log(permissionId);
            const permission = await this.permissionRepository.find(permissionId);
            if(permission){
                return permission;
            }
        })));

        console.log(role.permissions);

        return await this.roleRepository.save(role);
    }

    async removePermissionsFromRole(dto: ModifyRolePermissionsDTO, currentUser: User): Promise<Role>{
        
        if(!(dto.roleId && dto.permissionIds.length)){
            throw new BadRequestException(MessageUtil.INVALID_REQUEST_DATA);
        }

        const role = await this.roleRepository.find(dto.roleId);
        if(!role){
            throw new NotFoundException(MessageUtil.ROLE_NOT_FOUND);
        }

        role.permissions = role.permissions.filter(permission => {
            return !dto.permissionIds.includes(permission.id);
        })

        role.updatedBy = currentUser;
        return await this.roleRepository.save(role);
    }

    async delete(roleIds: number[], currentUser: User){}

}
