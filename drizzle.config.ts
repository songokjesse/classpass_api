import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./api/db/schema.ts",
    out: "./api/db/migrations",
    driver: "turso",
    dbCredentials: {
        url: process.env.TURSO_CONNECTION_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    },
    dialect: "sqlite",
    verbose: true,
    strict: true,
});
