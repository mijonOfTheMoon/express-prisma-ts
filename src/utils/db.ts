import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Graceful shutdown
process.on("SIGINT", async () => {
  await db.$disconnect();
  process.exit();
});

process.on("SIGTERM", async () => {
  await db.$disconnect();
  process.exit();
});

export { db };
