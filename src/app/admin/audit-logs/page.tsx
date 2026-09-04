
import React from 'react';
import { db } from '@/lib/db';

export default async function AdminAuditLogsPage() {
  const logs = await db.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Security Audit Logs</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Immutable chronological ledger of administrative operations and state transitions
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Action</th>
              <th className="p-4">Entity</th>
              <th className="p-4">Entity ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map((l) => (
              <tr key={l.id}>
                <td className="p-4 font-mono text-[11px] text-slate-400">
                  {l.createdAt.toLocaleString()}
                </td>
                <td className="p-4 font-mono font-bold text-teal-800">{l.action}</td>
                <td className="p-4">{l.entityType}</td>
                <td className="p-4 font-mono text-slate-500">{l.entityId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
