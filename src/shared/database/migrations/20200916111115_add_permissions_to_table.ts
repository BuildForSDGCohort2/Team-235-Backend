import * as Knex from "knex";
import { Permission } from "../../../role/permission.model";

const permissions = [
    //Users
    {value: "users.read", description: "View Users"},
    {value: "users.create", description: "Add Users"},
    {value: "users.update", description: "Update Users"},
    {value: "users.delete", description: "Delete Users"},

    //Permissions
    {value: "permissions.read", description: "View Permissions"},
    {value: "permissions.update", description: "Update Permissions"},

    //Roles
    {value: "roles.read", description: "View Roles"},
    {value: "roles.create", description: "Add Roles"},
    {value: "roles.update", description: "Update Roles"},
    {value: "roles.delete", description: "Delete Roles"},

    //Categories
    {value: "categories.read", description: "View Categories"},
    {value: "categories.create", description: "Add Categories"},
    {value: "categories.update", description: "Update Categories"},
    {value: "categories.delete", description: "Delete Categories"},

    //Stock
    {value: "stock.read", description: "View Stock"},
    {value: "stock.create", description: "Add Stock"},
    {value: "stock.update", description: "Update Stock"},
    {value: "stock.delete", description: "Delete Stock"},
];


export async function up(knex: Knex): Promise<void> {
    const queries = [];
    for(let permission of permissions){
        
        queries.push(
            knex.table(Permission.tableName).insert(permission)
        );
    }

    await Promise.all(queries);
}


export async function down(knex: Knex): Promise<void> {
    const queries = [];
    for(let permission of permissions){
        queries.push(
            knex.table(Permission.tableName).delete().where({
                value: permission.value
            })
        );
    }

    await Promise.all(queries);
}

