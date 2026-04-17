import "dotenv/config";
import { defineConfig } from "prisma/config";

const DEV_DATABASE_FALLBACK =
  "postgresql://postgres:athul@localhost:5432/user_app";

function resolvePrismaDatasourceUrl(): string {
  const url = process.env.DATABASE_URL?.trim();
  if (url) {
    return url;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is required in production");
  }
  return DEV_DATABASE_FALLBACK;
}

export default defineConfig({
  schema: "src/infrastructure/database/prisma/schema.prisma",
  datasource: {
    url: resolvePrismaDatasourceUrl()
  }
});
