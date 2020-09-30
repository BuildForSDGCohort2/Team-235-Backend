import * as Knex from "knex";
import { Category } from "../../../category/category.model";
import { Stock } from "../../../stock/stock.model";

const STOCKS_CATEGORIES_TABLE = "stocks_categories";

export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable(STOCKS_CATEGORIES_TABLE);
    if (!exists) {
        await knex.schema.createTable(STOCKS_CATEGORIES_TABLE, (table) => {
            table.integer("stock_id").unsigned().references("id").inTable(Stock.tableName);
            table.integer("category_id").unsigned().references("id").inTable(Category.tableName);
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(STOCKS_CATEGORIES_TABLE);
}

