import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "../shared/repository/repository";
import { Role } from "./role.model";
import { User } from "src/user/user.model";

@Injectable()
export class RoleRepository implements Repository<number, Role> {

    constructor(
        @Inject(Role)
        private readonly roleModel: typeof Role
    ){}

    async find(id: number): Promise<Role> {
        return await this.roleModel.query().findById(id)
        .withGraphFetched("*");
    }

    async findByName(name: string): Promise<Role>{
        return await this.roleModel.query().findOne({name});
    }

    async findAll(): Promise<Role[]> {
        return await this.roleModel.query()
        .withGraphFetched("*");
    }

    async save(role: Role): Promise<Role> {
        return await this.roleModel.query().upsertGraphAndFetch(role, {
            relate: true
        });
    }

    remove(data: Role): Promise<void> {
        throw new Error("Method not implemented.");
    }

}