import moment from "moment";
import { RoleDTO } from "./dto/role.dto";
import { Role } from "./role.model";
import { Mapper } from "../shared/mapper/mapper";
import { PermissionMapper } from "./permission.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RoleMapper implements Mapper<RoleDTO, Role>{

    constructor(
        private readonly permissionMapper: PermissionMapper
    ){}

    mapFromModel(role: Role): RoleDTO {
        return new RoleDTO({
            id: role.id,
            name: role.name,
            permissions: role.permissions
            .map((permission) => this.permissionMapper.mapFromModel(permission)),
            description: role.description,
            createdAt: Number(moment(role.createdAt).format("x"))
        });
    }
    
}