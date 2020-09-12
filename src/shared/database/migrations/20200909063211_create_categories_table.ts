import * as Knex from "knex";
import { Category } from "../../../category/category.model";

import { User } from "../../../user/user.model";

export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable(Category.tableName);

    // todo Fix migration
    if (!exists) {
        await knex.schema.raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"");
        return await knex.schema.createTable(Category.tableName, (table) => {
            table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
            table.string("name").notNullable();
            table.uuid("created_by_id").unsigned().references("id").inTable(User.tableName);
            table.uuid("updated_by_id").unsigned().references("id").inTable(User.tableName);
            table.timestamps(true, true);
        });
    }
}


export async function down(knex: Knex): Promise<void> {
}

