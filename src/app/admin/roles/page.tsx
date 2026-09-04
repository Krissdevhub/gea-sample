
import React from 'react';
import { db } from '@/lib/db';

export default async function AdminRolesPage() {
  const users = await db.user.findMany({
    include: { roles: true },
    take: 20,
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Role-Based Access Control (RBAC)</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Assign administrative authority and configure district jurisdictions
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-4">Email Account</th>
              <th className="p-4">Mobile</th>
              <th className="p-4">Assigned Roles</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="p-4 font-bold text-navy-900">{u.email}</td>
                <td className="p-4 font-mono">{u.mobile}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {u.roles.map((r) => (
                      <span key={r.roleId} className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {r.roleId}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
