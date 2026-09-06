import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use datasources override so Prisma doesn't throw "empty DATABASE_URL" error
// when the env var is not set (e.g. Vercel demo deployment without a real DB).
// Actual queries will fail gracefully — all callers use try-catch.
const createPrismaClient = () =>
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL || 'file:/tmp/demo-fallback.db',
      },
    },
  });

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
