import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { PortalNav } from '@/components/portal/PortalNav';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect('/login?next=/portal/dashboard');
  }

  const member = session.memberId
    ? await db.member.findUnique({
        where: { id: session.memberId },
      })
    : null;

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] bg-slate-100">
      <PortalNav
        member={{
          fullName: member?.fullName || session.memberName || session.email,
          membershipNumber: member?.membershipNumber || null,
          status: member?.status || 'PENDING',
        }}
      />
      <div className="flex-1 p-4 sm:p-8 max-w-7xl overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
