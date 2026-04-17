import dotenv from "dotenv";

dotenv.config();

const DEV_DATABASE_FALLBACK =
  "postgresql://postgres:postgres@localhost:5432/clean_arch";

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 3000),
  DATABASE_URL: process.env.DATABASE_URL ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "changeme",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "15m",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ?? "changedme",
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN ?? "7d"
};

export function resolveDatabaseUrl(): string {
  const url = env.DATABASE_URL.trim();
  if (url) {
    return url;
  }
  if (env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is required in production");
  }
  return DEV_DATABASE_FALLBACK;
}
