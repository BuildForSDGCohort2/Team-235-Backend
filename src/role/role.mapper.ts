import moment from "moment";
import { RoleDTO } from "./dto/role.dto";
import { Role } from "./role.model";
import { Mapper } from "../shared/mapper/mapper";
import { PermissionMapper } from "./permission.mapper";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { UserMapper } from "src/user/user.mapper";

@Injectable()
export class RoleMapper implements Mapper<RoleDTO, Role>{

    constructor(
        @Inject(forwardRef(() => UserMapper))
        private readonly userMapper: UserMapper,
        private readonly permissionMapper: PermissionMapper,
    ){}

    mapFromModel(role: Role): RoleDTO {
        return new RoleDTO({
            id: role.id,
            name: role.name,
            permissions: role.permissions
            .map((permission) => this.permissionMapper.mapFromModel(permission)),
            description: role.description,
            createdBy: !role.createdBy? null : this.userMapper.mapFromModel(role.createdBy),
            createdAt: Number(moment(role.createdAt).format("x"))
        });
    }
}