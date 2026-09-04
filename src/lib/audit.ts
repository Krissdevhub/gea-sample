import { db } from './db';

export interface AuditLogParams {
  actorId?: string | null;
  action: string;
  entityType: string;
  entityId: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export async function logAuditEvent(params: AuditLogParams): Promise<void> {
  try {
    // Sanitize metadata to never record passwords, tokens, or sensitive credentials
    const cleanMeta = { ...params.metadata };
    delete cleanMeta.password;
    delete cleanMeta.passwordHash;
    delete cleanMeta.token;
    delete cleanMeta.secret;

    await db.auditLog.create({
      data: {
        actorId: params.actorId || null,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        ipAddress: params.ipAddress || null,
        userAgent: params.userAgent || null,
        metadata: JSON.stringify(cleanMeta),
      },
    });
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
}
