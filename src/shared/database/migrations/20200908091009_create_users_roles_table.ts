import * as Knex from "knex";
import { User } from "../../../user/user.model";
import { Role } from "../../../role/role.model";

const USERS_ROLES_TABLE = "users_roles";

export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable(USERS_ROLES_TABLE);
    if(!exists){
        await knex.schema.createTable(USERS_ROLES_TABLE, (table) => {
            table.uuid("user_id").notNullable().unsigned().references("id").inTable(User.tableName).onDelete("CASCADE");
            table.integer("role_id").notNullable().unsigned().references("id").inTable(Role.tableName)
            .onDelete("CASCADE");
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(USERS_ROLES_TABLE);
}

