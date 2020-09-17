import { Mapper } from "src/shared/mapper/mapper";
import { PermissionDTO } from "./dto/permission.dto";
import { Permission } from "./permission.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PermissionMapper implements Mapper<PermissionDTO, Permission>{
    mapFromModel(permission: Permission): PermissionDTO {
        return new PermissionDTO({
            id: permission.id,
            value: permission.value,
            description: permission.description
        })
    }
}