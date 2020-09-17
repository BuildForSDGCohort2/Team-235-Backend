import { Model } from "objection";
import { Permission } from "./permission.model";
import { User } from "../user/user.model";
import moment from "moment";

export class Role extends Model {
    static tableName = "roles";

    id: number;
    name: string;
    description: string;
    permissions: Permission[] = [];
    createdAt: string = moment().toISOString();
    createdBy: User;
    updatedAt: string = moment().toISOString();
    updatedBy: User;

    static relationMappings = {

        permissions: {
            relation: Model.ManyToManyRelation,
            modelClass: __dirname + "/permission.model",
            join: {
                from: "roles.id",
                through: {
                  from: "roles_permissions.role_id",
                  to: "roles_permissions.permission_id" 
                },
                to: "permissions.id"
            }
        },

        createdBy: {
            relation: Model.BelongsToOneRelation,
            modelClass: __dirname + "/../user/user.model",
            join: {
                from: "roles.createdById",
                to: "users.id"
            }
        },

        updatedBy: {
            relation: Model.BelongsToOneRelation,
            modelClass: __dirname + "/../user/user.model",
            join: {
                from: "roles.updatedById",
                to: "users.id"
            }
        }
    }
}