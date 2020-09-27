import { Model } from "objection";
import { User } from "../user/user.model";


export class Stock extends Model {

    static tableName = "stocks";

    id: number;
    name: string;
    quantity: number;
    createdAt: string;
    createdBy: User;
    updatedAt: string;
    updatedBy: User;


    static relationMappings = {
        createdBy: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${Stock.tableName}.createdById`,
                to: `${User.tableName}.id`
            }
        },
        updatedBy: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${Stock.tableName}.updatedById`,
                to: `${User.tableName}.id`
            }
        }
    }
}
