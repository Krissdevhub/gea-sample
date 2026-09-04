import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword, createSessionToken, setSessionCookie } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: 'Please provide mobile/email and password.' }, { status: 400 });
    }

    const user = await db.user.findFirst({
      where: {
        OR: [{ email: identifier }, { mobile: identifier }],
      },
      include: {
        roles: true,
        member: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials entered.' }, { status: 401 });
    }

    if (user.status === 'SUSPENDED') {
      return NextResponse.json({ error: 'Your account has been suspended. Please contact MP-GEA secretariat.' }, { status: 403 });
    }

    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials entered.' }, { status: 401 });
    }

    // Update last login
    await db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const token = createSessionToken({
      id: user.id,
      email: user.email,
      mobile: user.mobile,
      roles: user.roles.map((r) => r.roleId),
      districtScope: user.roles.find((r) => r.districtScope)?.districtScope || null,
      memberId: user.member?.id || null,
      memberName: user.member?.fullName || null,
      membershipNumber: user.member?.membershipNumber || null,
      membershipStatus: user.member?.status || null,
    });

    await setSessionCookie(token);

    await logAuditEvent({
      actorId: user.id,
      action: 'USER_LOGIN',
      entityType: 'User',
      entityId: user.id,
    });

    const redirectUrl = user.roles.some((r) => r.roleId.includes('ADMIN')) ? '/admin' : '/portal/dashboard';

    return NextResponse.json({ success: true, redirectUrl });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal server error during authentication.' }, { status: 500 });
  }
}
