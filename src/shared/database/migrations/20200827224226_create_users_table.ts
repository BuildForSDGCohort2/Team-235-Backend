import * as Knex from "knex";
import { User } from "../../../user/user.model";


export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable(User.tableName);
    if(!exists){
        await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        return await knex.schema.createTable(User.tableName, (table) => {
            table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"))
            table.string("first_name").notNullable()
            table.string("last_name").notNullable()
            table.string("image_url")
            table.string("email").notNullable()
            table.string("password").notNullable()
            table.string("phone_number")
            table.boolean("blocked").defaultTo(false)
            table.uuid("created_by_id").unsigned().references("id").inTable(User.tableName)
            table.uuid("updated_by_id").unsigned().references("id").inTable(User.tableName)
            table.timestamp("verified_at")
            table.timestamps(true, true);
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists(User.tableName);
}

