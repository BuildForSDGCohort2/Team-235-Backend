import { Model } from "objection";


export class User extends Model {

  static tableName = "users";

  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  password: string;
  blocked: boolean;
  phoneNumber: string;
  verifiedAt: string;
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
