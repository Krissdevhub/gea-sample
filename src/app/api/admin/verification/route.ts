import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { hasPermission } from '@/lib/rbac';
import { logAuditEvent } from '@/lib/audit';
import { sendEmail, getCorrectionRequiredEmail, getApprovalEmail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session, 'VERIFY_APPLICATIONS')) {
      return NextResponse.json({ error: 'Unauthorized: insufficient permissions.' }, { status: 403 });
    }

    const { memberId, action, reason } = await req.json();

    if (!memberId || !action) {
      return NextResponse.json({ error: 'Missing memberId or action.' }, { status: 400 });
    }

    const member = await db.member.findUnique({
      where: { id: memberId },
      include: { user: true },
    });

    if (!member) {
      return NextResponse.json({ error: 'Member not found.' }, { status: 404 });
    }

    if (action === 'APPROVE') {
      await db.member.update({
        where: { id: memberId },
        data: { status: 'APPROVED_AWAITING_PAYMENT' },
      });

      await db.memberApplication.create({
        data: {
          memberId,
          status: 'APPROVED_AWAITING_PAYMENT',
          adminNotes: reason || 'Approved by Scrutiny Officer. Awaiting subscription fee.',
          reviewedBy: session.id,
          reviewedAt: new Date(),
        },
      });

      const emailData = getApprovalEmail(member.fullName, 1000);
      await sendEmail({
        to: member.user.email,
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html,
      });

      await logAuditEvent({
        actorId: session.id,
        action: 'MEMBER_APPLICATION_APPROVED',
        entityType: 'Member',
        entityId: memberId,
      });

      return NextResponse.json({ success: true, newStatus: 'APPROVED_AWAITING_PAYMENT' });
    }

    if (action === 'REQUEST_CORRECTION') {
      if (!reason) {
        return NextResponse.json({ error: 'Correction note is mandatory when requesting correction.' }, { status: 400 });
      }

      await db.member.update({
        where: { id: memberId },
        data: { status: 'CORRECTION_REQUIRED' },
      });

      await db.memberApplication.create({
        data: {
          memberId,
          status: 'CORRECTION_REQUIRED',
          correctionRequested: reason,
          reviewedBy: session.id,
          reviewedAt: new Date(),
        },
      });

      const emailData = getCorrectionRequiredEmail(member.fullName, reason);
      await sendEmail({
        to: member.user.email,
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html,
      });

      await logAuditEvent({
        actorId: session.id,
        action: 'MEMBER_CORRECTION_REQUESTED',
        entityType: 'Member',
        entityId: memberId,
        metadata: { reason },
      });

      return NextResponse.json({ success: true, newStatus: 'CORRECTION_REQUIRED' });
    }

    if (action === 'REJECT') {
      await db.member.update({
        where: { id: memberId },
        data: { status: 'REJECTED' },
      });

      await db.memberApplication.create({
        data: {
          memberId,
          status: 'REJECTED',
          adminNotes: reason || 'Rejected during verification.',
          reviewedBy: session.id,
          reviewedAt: new Date(),
        },
      });

      await logAuditEvent({
        actorId: session.id,
        action: 'MEMBER_APPLICATION_REJECTED',
        entityType: 'Member',
        entityId: memberId,
        metadata: { reason },
      });

      return NextResponse.json({ success: true, newStatus: 'REJECTED' });
    }

    return NextResponse.json({ error: 'Invalid action specified.' }, { status: 400 });
  } catch (err: any) {
    console.error('Verification error:', err);
    return NextResponse.json({ error: err.message || 'Verification processing failed.' }, { status: 500 });
  }
}
