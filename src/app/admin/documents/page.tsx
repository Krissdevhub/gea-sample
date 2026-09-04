
import React from 'react';
import { db } from '@/lib/db';

export default async function AdminDocumentsPage() {
  const docs = await db.document.findMany({
    orderBy: { createdAt: 'desc' },
    include: { department: true },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Document & Circular Publisher</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Publish and manage gazette orders, service rules, and member-only advisories
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Department</th>
              <th className="p-4">Date</th>
              <th className="p-4">Visibility</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {docs.map((d) => (
              <tr key={d.id}>
                <td className="p-4 font-bold text-navy-900">{d.title}</td>
                <td className="p-4">{d.category.replace(/_/g, ' ')}</td>
                <td className="p-4">{d.department?.name || 'General'}</td>
                <td className="p-4">{d.issueDate}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                    {d.visibility}
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
