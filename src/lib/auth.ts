import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './db';

const SESSION_COOKIE = 'mpgea_session';
const JWT_SECRET = process.env.SESSION_SECRET || 'fallback-mpgea-secret-key-32-chars-long';

export interface SessionUser {
  id: string;
  email: string;
  mobile: string;
  roles: string[];
  districtScope?: string | null;
  memberId?: string | null;
  memberName?: string | null;
  membershipNumber?: string | null;
  membershipStatus?: string | null;
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

export function createSessionToken(user: SessionUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

export function verifySessionToken(token: string): SessionUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionUser;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;
    const session = verifySessionToken(token);
    if (!session) return null;

    // Refresh member details from DB
    const user = await db.user.findUnique({
      where: { id: session.id },
      include: {
        roles: true,
        member: true,
      },
    });

    if (!user || user.status === 'SUSPENDED') return null;

    return {
      id: user.id,
      email: user.email,
      mobile: user.mobile,
      roles: user.roles.map((r) => r.roleId),
      districtScope: user.roles.find((r) => r.districtScope)?.districtScope || null,
      memberId: user.member?.id || null,
      memberName: user.member?.fullName || null,
      membershipNumber: user.member?.membershipNumber || null,
      membershipStatus: user.member?.status || null,
    };
  } catch {
    return null;
  }
}
