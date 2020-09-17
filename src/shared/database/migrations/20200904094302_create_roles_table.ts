import * as Knex from "knex";
import { Role } from "../../../role/role.model";
import { User } from "../../../user/user.model";


export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable(Role.tableName)
    if(!exists){
        await knex.schema.createTable(Role.tableName, (table) => {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.string("description");
            table.uuid("created_by_id").unsigned().references("id").inTable(User.tableName);
            table.uuid("updated_by_id").unsigned().references("id").inTable(User.tableName);
            table.timestamps(true, true);
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(Role.tableName)
}

