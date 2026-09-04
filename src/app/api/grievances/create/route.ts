import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { generateGrievanceReference } from '@/lib/id-generator';
import { logAuditEvent } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.memberId) {
      return NextResponse.json({ error: 'Unauthorized: login required.' }, { status: 401 });
    }

    const { category, subject, description } = await req.json();

    if (!category || !subject || !description) {
      return NextResponse.json({ error: 'Please provide category, subject, and detailed description.' }, { status: 400 });
    }

    const refNo = await generateGrievanceReference();

    const grievance = await db.grievance.create({
      data: {
        referenceNumber: refNo,
        memberId: session.memberId,
        category,
        subject,
        description,
        status: 'SUBMITTED',
      },
    });

    await db.grievanceUpdate.create({
      data: {
        grievanceId: grievance.id,
        updatedBy: session.id,
        statusChange: 'SUBMITTED',
        message: 'Grievance ticket created by member.',
        isInternal: false,
      },
    });

    await logAuditEvent({
      actorId: session.id,
      action: 'GRIEVANCE_SUBMITTED',
      entityType: 'Grievance',
      entityId: grievance.id,
      metadata: { referenceNumber: refNo, category },
    });

    return NextResponse.json({ success: true, referenceNumber: refNo, id: grievance.id });
  } catch (err: any) {
    console.error('Grievance submission error:', err);
    return NextResponse.json({ error: err.message || 'Failed to submit grievance.' }, { status: 500 });
  }
}
