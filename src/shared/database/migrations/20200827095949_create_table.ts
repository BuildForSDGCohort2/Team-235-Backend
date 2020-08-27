import * as Knex from "knex";
import { User } from "src/authentication/entities/user.entity";


export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable(User.tableName);
    if (!exists) {
        await knex.schema.createTable(User.tableName, (table) => {
            table.uuid("id").primary()
            table.string("username").notNullable();
            table.string("password").notNullable();
            table.string("salt").notNullable();
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(User.tableName);
}

