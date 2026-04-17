import "./config/env";

import { app } from "./app";
import { serverConfig } from "./config/server.config";
import { prisma } from "./infrastructure/database/prisma/prisma.client";
import { logger } from "./shared/utils/logger";

const server = app.listen(serverConfig.port, () => {
  logger.info(`Server running on port ${serverConfig.port}`);
});

async function shutdown(signal: string): Promise<void> {
  logger.info(`${signal} received, shutting down`);
  await new Promise<void>((resolve, reject) => {
    server.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      logger.info("HTTP server closed");
      resolve();
    });
  });
  await prisma.$disconnect();
  process.exit(0);
}

process.once("SIGTERM", () => {
  void shutdown("SIGTERM");
});
process.once("SIGINT", () => {
  void shutdown("SIGINT");
});
