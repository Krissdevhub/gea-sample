import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use datasources override so Prisma doesn't throw "empty DATABASE_URL" error
// when the env var is not set (e.g. Vercel demo deployment without a real DB).
const createPrismaClient = () =>
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL || 'file:/tmp/demo-fallback.db',
      },
    },
  });

const rawPrisma = globalForPrisma.prisma ?? createPrismaClient();

function createSafeDb(target: any): any {
  return new Proxy(target, {
    get(obj, prop) {
      if (prop === '$transaction') {
        return async (arg: any) => {
          try {
            if (typeof target.$transaction === 'function') {
              return await target.$transaction(arg);
            }
          } catch {
            // DB fallback
          }
          if (Array.isArray(arg)) {
            return Promise.all(arg.map(() => ({})));
          }
          return {};
        };
      }

      const model = obj[prop];
      if (typeof prop === 'string' && !prop.startsWith('$')) {
        return new Proxy(model || {}, {
          get(modelObj, method) {
            const originalMethod = modelObj ? modelObj[method] : undefined;
            return async (...args: any[]) => {
              if (typeof originalMethod === 'function') {
                try {
                  return await originalMethod.apply(modelObj, args);
                } catch {
                  // Fall through to safe defaults when DB is unavailable or tables don't exist
                }
              }
              const mStr = String(method);
              if (mStr.startsWith('findMany')) return [];
              if (mStr.startsWith('count') || mStr.startsWith('aggregate')) return 0;
              if (mStr.startsWith('findFirst') || mStr.startsWith('findUnique')) return null;
              if (mStr.startsWith('create') || mStr.startsWith('update') || mStr.startsWith('upsert')) {
                return { id: 'demo-' + Date.now(), ...(args[0]?.data || {}) };
              }
              if (mStr.startsWith('delete')) return { id: 'deleted' };
              return null;
            };
          },
        });
      }
      return model;
    },
  });
}

export const db = createSafeDb(rawPrisma) as PrismaClient;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = rawPrisma;

