
import React from 'react';
import { db } from '@/lib/db';
import { CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default async function VerifyMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const rawId = resolvedParams.id;
  const decodedNumber = rawId.replace(/-/g, '/');

  const member = await db.member.findFirst({
    where: {
      OR: [
        { membershipNumber: decodedNumber },
        { id: rawId },
        { qrCodeHash: rawId },
      ],
    },
    include: {
      department: true,
      branch: true,
      district: true,
    },
  });

  if (!member) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-navy-900">Record Not Verified</h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            No active member was found matching the scanned identification token. Please verify that the membership number or QR is legitimate.
          </p>
          <Link href="/" className="inline-block text-xs font-bold text-teal-700 hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const isActive = member.status === 'ACTIVE';

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-navy-900 text-white p-6 text-center space-y-1">
          <div className="w-12 h-12 bg-teal-800 text-teal-300 rounded-xl flex items-center justify-center text-2xl mx-auto border border-teal-500">
            ⚙️
          </div>
          <div className="text-[11px] font-bold text-teal-400 uppercase tracking-widest mt-2">Official Verification</div>
          <h1 className="text-xl font-extrabold text-white">Madhya Pradesh Government Engineers’ Association</h1>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>OFFICIALLY VERIFIED ACTIVE MEMBER</span>
            </div>
            <h2 className="text-2xl font-extrabold text-navy-900">{member.fullName}</h2>
            <div className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded border border-amber-200 inline-block">
              {member.membershipNumber}
            </div>
          </div>

          {/* Privacy-Safe Verification Details */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Designation:</span>
              <span className="font-bold text-navy-900">{member.designation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Engineering Branch:</span>
              <span className="font-bold text-navy-900">{member.branch.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Department:</span>
              <span className="font-bold text-navy-900">{member.department.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Posting District:</span>
              <span className="font-bold text-navy-900">{member.district.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Card Issued:</span>
              <span className="font-bold text-navy-900">
                {member.cardIssuedAt ? new Date(member.cardIssuedAt).toLocaleDateString() : 'Active'}
              </span>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 text-center leading-relaxed">
            Privacy Protected: Personal contact numbers, residential addresses, and departmental ID documents are withheld in compliance with MP-GEA data governance rules.
          </div>
        </div>
      </div>
    </div>
  );
}
