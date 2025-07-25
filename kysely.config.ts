import { defineConfig } from "kysely-ctl";
import { kyselyDialect } from "./src/db";

export default defineConfig({
  dialect: kyselyDialect,
  migrations: {
    migrationFolder: "./src/db/migrations",
  },
});
