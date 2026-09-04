import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { hasPermission } from '@/lib/rbac';
import { logAuditEvent } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session, 'MANAGE_GRIEVANCES')) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 403 });
    }

    const { grievanceId, status, assignedTo, message, isInternal = false } = await req.json();

    if (!grievanceId || !message) {
      return NextResponse.json({ error: 'Missing grievanceId or update message.' }, { status: 400 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (assignedTo) updateData.assignedTo = assignedTo;

    if (Object.keys(updateData).length > 0) {
      await db.grievance.update({
        where: { id: grievanceId },
        data: updateData,
      });
    }

    await db.grievanceUpdate.create({
      data: {
        grievanceId,
        updatedBy: session.id,
        statusChange: status || null,
        message,
        isInternal: Boolean(isInternal),
      },
    });

    await logAuditEvent({
      actorId: session.id,
      action: 'GRIEVANCE_UPDATED',
      entityType: 'Grievance',
      entityId: grievanceId,
      metadata: { status, isInternal },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Grievance update error:', err);
    return NextResponse.json({ error: err.message || 'Failed to update grievance.' }, { status: 500 });
  }
}
