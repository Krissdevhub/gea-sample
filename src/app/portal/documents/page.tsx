
import React from 'react';
import { db } from '@/lib/db';
import { Download } from 'lucide-react';

export default async function MemberDocumentsPage() {
  const docs = await db.document.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
    include: { department: true },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Protected Document Library</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Government orders, promotion lists, and association circulars accessible to members
        </p>
      </div>

      <div className="space-y-4">
        {docs.map((d) => (
          <div key={d.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                  {d.category.replace(/_/g, ' ')}
                </span>
                <span className="text-xs text-slate-500">{d.issueDate}</span>
                {d.visibility === 'MEMBERS_ONLY' && (
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-amber-50 text-amber-800 rounded border border-amber-300">
                    Protected Member Document
                  </span>
                )}
              </div>
              <h3 className="font-bold text-base text-navy-900 mt-1">{d.title}</h3>
              <p className="text-xs text-slate-500">{d.department?.name || 'State Government'}</p>
            </div>
            <a
              href={`/api/documents/stream?id=${d.id}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" /> Download / View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
