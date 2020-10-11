import { Model } from "objection";
import { Role } from "../role/role.model";
import moment from "moment";


export class User extends Model {

  static tableName = "users";

  id: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  email: string;
  password: string;
  blocked: boolean = false;
  phoneNumber?: string;
  roles: Role[] = [];
  verifiedAt: string;
  createdAt: string = moment().toISOString();
  createdBy: User;
  updatedAt: string = moment().toISOString();
  updatedBy: User;

  

  static relationMappings = {
    roles: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + "/../role/role.model",
      join: {
        from: "users.id",
        through: {
          from: "users_roles.userId",
          to: "users_roles.roleId"
        },
        to: "roles.id"
      }
    },
    createdBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + "/user.model",
      join: {
        from: `users.createdById`,
        to: `users.id`
      }
    },
    updatedBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: `users.updatedById`,
        to: `users.id`
      }
    }
  }
}
