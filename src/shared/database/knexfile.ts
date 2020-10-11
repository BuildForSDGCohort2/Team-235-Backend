import * as dotenv from "dotenv";
import { Config } from "knex";
import * as path from "path";
import { knexSnakeCaseMappers } from "objection";

dotenv.config()

const config = {
  client: "postgresql",
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    extension: "ts",
    directory: path.join(__dirname, "migrations"),
    tableName: "knex_migrations"
  },
  seeds: {
    extension: "ts",
    directory: path.join(__dirname, "seeds")
  },
  ...knexSnakeCaseMappers()
} as Config


module.exports = {

  development: {
    ...config,
    connection: String(process.env.DATABASE_URL)

  },
  production: {
    ...config,
    connection: {
      connectionString: String(process.env.DATABASE_URL),
      ssl: { rejectUnauthorized: false } 
    }
  }

};