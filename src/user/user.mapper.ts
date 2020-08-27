import moment from "moment";
import { Mapper } from "src/shared/mapper/mapper";
import { UserDTO } from "./dto/user.dto";
import { User } from "./user.model";

export class UserMapper implements Mapper<UserDTO, User> {
    mapFromModel(user: User): UserDTO {
       return new UserDTO({
           id: user.id,
           firstName: user.firstName,
           lastName: user.lastName,
           email: user.email,
           phoneNumber: user.phoneNumber,
           blocked: user.blocked,
           isVerified: user.verifiedAt != null,
           createdAt: Number(moment(user.createdAt).format("x"))
       })
    }
    
}