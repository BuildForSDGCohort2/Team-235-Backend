import * as Knex from "knex";
import moment from "moment";
import bcrypt from "bcrypt";
import { User } from "../../../user/user.model";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(User.tableName).del();

    // Inserts seed entries
    await knex(User.tableName).insert([
        { 
            firstName: "Admin",
            lastName: "Admin",
            email: "admin@gmail.com",
            verifiedAt: moment().toISOString(),
            password: await bcrypt.hash(String(process.env.ADMIN_SEEDER_PASSWORD), 10)
        }
    ]);
};
