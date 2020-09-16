import { Model } from "objection";
import { User } from "../user/user.model";


export class Category extends Model {

    static tableName = "categories";

    id: string;
    name: string;
    createdAt: string;
    createdBy: User;
    updatedAt: string;
    updatedBy: User;


    static relationMappings = {
        createdBy: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${User.tableName}.createdById`,
                to: `${User.tableName}.id`
            }
        },
        updatedBy: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${User.tableName}.updatedById`,
                to: `${User.tableName}.id`
            }
        }
    }
}
