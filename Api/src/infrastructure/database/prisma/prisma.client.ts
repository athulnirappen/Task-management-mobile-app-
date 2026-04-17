import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { resolveDatabaseUrl } from "../../../config/env";

const adapter = new PrismaPg({
  connectionString: resolveDatabaseUrl()
});

export const prisma = new PrismaClient({
  adapter
});
