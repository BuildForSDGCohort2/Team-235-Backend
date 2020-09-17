import * as Knex from "knex";
import { Role } from "../../../role/role.model";
import { Permission } from "../../../role/permission.model";

const ROLES_PERMISSIONS_TABLE = "roles_permissions";

export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable(ROLES_PERMISSIONS_TABLE);
    if(!exists){
        await knex.schema.createTable(ROLES_PERMISSIONS_TABLE, (table) => {
            table.integer("role_id").notNullable().unsigned().references("id").inTable(Role.tableName).onDelete("CASCADE");
			table.integer("permission_id").notNullable().unsigned().references("id").inTable(Permission.tableName).onDelete("CASCADE");
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(ROLES_PERMISSIONS_TABLE);
}

