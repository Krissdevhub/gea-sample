
import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';

export default async function ProfilePage() {
  const session = await getSession();
  if (!session || !session.memberId) redirect('/login');

  const member = await db.member.findUnique({
    where: { id: session.memberId },
    include: {
      user: true,
      department: true,
      branch: true,
      district: true,
    },
  });

  if (!member) redirect('/login');

  return (
    <div className="max-w-4xl space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">My Member Profile</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          View verified government service credentials and communication preferences
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-navy-900 border-b border-slate-100 pb-2">
          Verified Service Credentials (Locked)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-500 block font-semibold mb-1">Full Legal Name</label>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md font-bold text-navy-900">
              {member.fullName}
            </div>
          </div>
          <div>
            <label className="text-slate-500 block font-semibold mb-1">Government Employee ID</label>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md font-mono text-navy-900">
              {member.employeeId}
            </div>
          </div>
          <div>
            <label className="text-slate-500 block font-semibold mb-1">State Department</label>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md text-navy-900">
              {member.department.name}
            </div>
          </div>
          <div>
            <label className="text-slate-500 block font-semibold mb-1">Cadre / Designation</label>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md text-navy-900">
              {member.designation}
            </div>
          </div>
          <div>
            <label className="text-slate-500 block font-semibold mb-1">Engineering Branch</label>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md text-navy-900">
              {member.branch.name}
            </div>
          </div>
          <div>
            <label className="text-slate-500 block font-semibold mb-1">Posting District</label>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md text-navy-900">
              {member.district.name}
            </div>
          </div>
        </div>

        <h2 className="text-base font-bold text-navy-900 border-b border-slate-100 pb-2 pt-4">
          Contact Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-500 block font-semibold mb-1">Registered Mobile Number</label>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md text-navy-900 font-mono">
              {member.user.mobile}
            </div>
          </div>
          <div>
            <label className="text-slate-500 block font-semibold mb-1">Official Email Address</label>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md text-navy-900">
              {member.user.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
