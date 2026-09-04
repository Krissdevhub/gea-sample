
import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { DigitalIdCard } from '@/components/portal/DigitalIdCard';

export default async function IdCardPage() {
  const session = await getSession();
  if (!session || !session.memberId) redirect('/login');

  const member = await db.member.findUnique({
    where: { id: session.memberId },
    include: {
      department: true,
      branch: true,
      district: true,
    },
  });

  if (!member) redirect('/login');

  if (member.status !== 'ACTIVE') {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm text-center space-y-4 max-w-lg mx-auto mt-12">
        <div className="text-4xl">🔒</div>
        <h2 className="text-xl font-bold text-navy-900">Digital ID Card Locked</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Your official MP-GEA Digital Membership Identity Card is issued immediately upon successful verification and subscription payment activation.
        </p>
        <div className="text-xs font-semibold text-amber-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
          Current Status: {member.status.replace(/_/g, ' ')}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Official Digital Membership Identity</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Permanent digital credential issued by Madhya Pradesh Government Engineers’ Association
        </p>
      </div>

      <DigitalIdCard
        member={{
          fullName: member.fullName,
          membershipNumber: member.membershipNumber || 'N/A',
          designation: member.designation,
          departmentName: member.department.name,
          branchName: member.branch.name,
          postingDistrictName: member.district.name,
          status: member.status,
          cardIssuedAt: member.cardIssuedAt ? member.cardIssuedAt.toISOString() : null,
          photoUrl: member.photoUrl,
          qrCodeHash: member.qrCodeHash,
        }}
      />
    </div>
  );
}
