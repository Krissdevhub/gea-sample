import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.memberId) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { memberId, notes } = await req.json();

    await db.member.update({
      where: { id: memberId },
      data: { status: 'UNDER_REVIEW' },
    });

    await db.memberApplication.create({
      data: {
        memberId,
        status: 'UNDER_REVIEW',
        adminNotes: `Member resubmitted correction: ${notes}`,
      },
    });

    await logAuditEvent({
      actorId: session.id,
      action: 'MEMBER_CORRECTION_RESUBMITTED',
      entityType: 'Member',
      entityId: memberId,
      metadata: { notes },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
