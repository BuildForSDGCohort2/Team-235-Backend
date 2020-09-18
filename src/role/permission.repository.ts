import { Repository } from "../shared/repository/repository";
import { Permission } from "./permission.model";
import { Inject } from "@nestjs/common";

export class PermissionRepository implements Repository<number, Permission>{

    constructor(
        @Inject(Permission)
        private readonly permissionModel: typeof Permission
    ){}

    async find(id: number): Promise<Permission> {
        return await this.permissionModel.query().findById(id);
    }

    async findAll(): Promise<Permission[]> {
        return await this.permissionModel.query();
    }

    async save(permission: Permission): Promise<Permission> {
        throw new Error("Method not implemented.");
    }

    remove(data: Permission): Promise<void> {
        throw new Error("Method not implemented.");
    }

}