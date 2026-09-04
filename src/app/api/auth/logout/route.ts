import { NextResponse } from 'next/server';
import { clearSessionCookie, getSession } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';

export async function POST(req: Request) {
  const session = await getSession();
  if (session) {
    await logAuditEvent({
      actorId: session.id,
      action: 'USER_LOGOUT',
      entityType: 'User',
      entityId: session.id,
    });
  }
  await clearSessionCookie();
  return NextResponse.redirect(new URL('/login', req.url), 303);
}

export async function GET(req: Request) {
  await clearSessionCookie();
  return NextResponse.redirect(new URL('/login', req.url), 303);
}
