import { Model } from "objection";


export class User extends Model {

  static tableName = "users";

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  blocked: boolean;
  phoneNumber: string;
  verifiedAt: string
  createdAt: string;
  createdBy: User;
  updatedAt: string;
  updatedBy: User;


  static relationMappings = {
    createdBy: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: `${User.tableName}.id`,
        to: `${User.tableName}.created_by_id`
      }
    },
    updatedBy: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: `${User.tableName}.id`,
        to: `${User.tableName}.created_by_id`
      }
    }
  }
}
