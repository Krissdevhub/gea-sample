
import React from 'react';
import { db } from '@/lib/db';
import { Download } from 'lucide-react';

export default async function AdminMembersPage() {
  const members = await db.member.findMany({
    include: {
      user: true,
      department: true,
      branch: true,
      district: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-900">Member Master Roster</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Full administrative database of serving engineers ({members.length} records)
          </p>
        </div>
        <a
          href="/api/admin/export?type=members"
          className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
        >
          <Download className="w-3.5 h-3.5 mr-1.5" /> Export Excel/CSV
        </a>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4">Membership No</th>
                <th className="p-4">Engineer Name</th>
                <th className="p-4">Employee ID</th>
                <th className="p-4">Cadre</th>
                <th className="p-4">Department</th>
                <th className="p-4">District</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono font-bold text-amber-900">{m.membershipNumber || 'Pending'}</td>
                  <td className="p-4 font-bold text-navy-900">{m.fullName}</td>
                  <td className="p-4 font-mono">{m.employeeId}</td>
                  <td className="p-4">{m.designation}</td>
                  <td className="p-4">{m.department.name}</td>
                  <td className="p-4 font-semibold">{m.district.name}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      m.status === 'ACTIVE'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-800'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
