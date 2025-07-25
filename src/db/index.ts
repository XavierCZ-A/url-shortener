import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { config } from "../config/config";
import type { Database } from "./models/urls";

export const kyselyDialect = new PostgresDialect({
  pool: new Pool({
    database: config.DATABASE_NAME,
    host: config.DATABASE_HOST,
    user: config.DATABASE_USER,
    port: config.DATABASE_PORT,
    password: config.DATABASE_PASSWORD,
  }),
});

export const db = new Kysely<Database>({
  dialect: kyselyDialect,
});
