import { Model } from "objection";
import { Category } from "../category/category.model";
import { User } from "../user/user.model";


export class Stock extends Model {

    static tableName = "stocks";

    id: number;
    name: string;
    quantity: number;
    categories: Category[] = []
    createdAt: string;
    createdBy: User;
    updatedAt: string;
    updatedBy: User;


    /**
     * stock        category   stocks_categories
     * id|name      id|name    stock_id|category_id
       1   Para     1  Drug     1          1
       2   Insulin  2  Tablet   2          1
                                1          2
       
       */


    static relationMappings = {
        categories: {
            relation: Model.ManyToManyRelation,
            modelClass: Category,
            join: {
                from: "stocks.id",
                through: {
                  from: "stocks_categories.stockId",
                  to: "stocks_categories.categoryId"
                },
                to: "categories.id"
              }
        },
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
