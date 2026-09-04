
import React from 'react';
import { db } from '@/lib/db';

export default async function DirectoryPage() {
  const members = await db.member.findMany({
    where: { status: 'ACTIVE' },
    include: {
      department: true,
      branch: true,
      district: true,
    },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Member Directory</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Serving state government engineers across 55 districts (Privacy Masked)
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Membership Number</th>
                <th className="p-4">Engineer Name</th>
                <th className="p-4">Cadre / Designation</th>
                <th className="p-4">Department</th>
                <th className="p-4">Branch</th>
                <th className="p-4">District</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/80">
                  <td className="p-4 font-mono font-bold text-amber-900">{m.membershipNumber}</td>
                  <td className="p-4 font-bold text-navy-900">{m.fullName}</td>
                  <td className="p-4">{m.designation}</td>
                  <td className="p-4">{m.department.name}</td>
                  <td className="p-4">{m.branch.name}</td>
                  <td className="p-4 font-semibold">{m.district.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
