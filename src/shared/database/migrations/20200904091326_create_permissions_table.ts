import * as Knex from "knex";
import { Permission } from "../../../role/permission.model";


export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable(Permission.tableName);
    if(!exists){
        await knex.schema.createTable(Permission.tableName, (table) => {
            table.increments("id").primary();
            table.string("value").notNullable();
            table.string("description").notNullable();
            table.timestamps(true, true);
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(Permission.tableName);
}

