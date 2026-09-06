import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { PortalNav } from '@/components/portal/PortalNav';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect('/login?next=/portal/dashboard');
  }

  // ─────────────────────────────────────────────────────────────
  // DEMO MODE: Use session data directly, no DB needed
  // ─────────────────────────────────────────────────────────────
  let memberDisplay = {
    fullName: session.memberName || session.email,
    membershipNumber: session.membershipNumber || null,
    status: (session.membershipStatus || 'ACTIVE') as string,
  };

  // REAL DB: Fetch live member data (only if not a demo user)
  if (session.memberId && !session.memberId.startsWith('demo-')) {
    try {
      const { db } = await import('@/lib/db');
      const member = await db.member.findUnique({ where: { id: session.memberId } });
      if (member) {
        memberDisplay = {
          fullName: member.fullName,
          membershipNumber: member.membershipNumber || null,
          status: member.status,
        };
      }
    } catch {
      // DB not connected, fall through with session data
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-slate-100">
      <PortalNav member={memberDisplay} />
      <div className="flex-1 p-4 sm:p-8 max-w-7xl overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

