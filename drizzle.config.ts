import { defineConfig } from 'drizzle-kit'
export default defineConfig({
    schema: "./src/schema/*",
    out: "./migrations",
    strict: true,
})
