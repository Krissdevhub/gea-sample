import React from 'react';
import { db } from '@/lib/db';
import { VerificationWorkbench } from './VerificationWorkbench';

export const revalidate = 0;

export default async function VerificationQueuePage() {
  const pendingMembers = await db.member.findMany({
    where: {
      status: { in: ['SUBMITTED', 'CORRECTION_REQUIRED', 'UNDER_REVIEW'] },
    },
    include: {
      user: true,
      department: true,
      branch: true,
      district: true,
      documents: true,
      applications: { orderBy: { createdAt: 'desc' } },
    },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Membership Verification Workbench</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Scrutinize government engineering service proofs, request corrections, or grant membership approvals
        </p>
      </div>

      <VerificationWorkbench initialMembers={pendingMembers} />
    </div>
  );
}
