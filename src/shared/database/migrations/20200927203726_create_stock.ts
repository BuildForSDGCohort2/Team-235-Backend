import * as Knex from "knex";
import { Stock } from "../../../stock/stock.model";
import { User } from "../../../user/user.model";


export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable(Stock.tableName);

    if (!exists) {
        return await knex.schema.createTable(Stock.tableName, (table) => {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.string("quantity").notNullable();
            table.uuid("created_by_id").unsigned().references("id").inTable(User.tableName);
            table.uuid("updated_by_id").unsigned().references("id").inTable(User.tableName);
            table.timestamps(true, true);
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists(Stock.tableName);
}

