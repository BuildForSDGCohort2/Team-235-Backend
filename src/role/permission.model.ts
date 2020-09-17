import { Model } from "objection";

export class Permission extends Model {

    static tableName = "permissions";

    id: number;
    value: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}