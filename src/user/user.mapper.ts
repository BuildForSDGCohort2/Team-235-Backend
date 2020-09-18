import moment from "moment";
import { Mapper } from "src/shared/mapper/mapper";
import { UserDTO } from "./dto/user.dto";
import { User } from "./user.model";
import { Injectable } from "@nestjs/common";
import { RoleMapper } from "src/role/role.mapper";

@Injectable()
export class UserMapper implements Mapper<UserDTO, User> {

    constructor(
        private readonly roleMapper: RoleMapper
    ){}

    mapFromModel(user: User): UserDTO {
       return new UserDTO({
           id: user.id,
           firstName: user.firstName,
           lastName: user.lastName,
           imageUrl: user.imageUrl,
           email: user.email,
           phoneNumber: user.phoneNumber,
           roles: user.roles.map((role) => {
               return this.roleMapper.mapFromModel(role);
           }),
           blocked: user.blocked,
           isVerified: user.verifiedAt !== null,
           createdAt: Number(moment(user.createdAt).format("x")),
       });
    }
    
}