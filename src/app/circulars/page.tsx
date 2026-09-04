
import React from 'react';
import { db } from '@/lib/db';
import { Download } from 'lucide-react';

export default async function CircularsPage() {
  const circulars = await db.document.findMany({
    where: { category: 'ASSOCIATION_CIRCULAR', isPublished: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Internal Communications</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Association Circulars</h1>
        <p className="text-slate-600 text-sm mt-1">Executive notices, general body resolutions, and cadre advisories</p>
      </div>

      <div className="space-y-4">
        {circulars.map((c) => (
          <div key={c.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <div className="text-xs text-slate-500">{c.issueDate}</div>
              <h3 className="font-bold text-base text-navy-900 mt-1">{c.title}</h3>
              {c.orderNumber && <div className="text-xs text-slate-500 font-mono mt-0.5">Ref: {c.orderNumber}</div>}
            </div>
            <a
              href={`/api/documents/stream?id=${c.id}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
            >
              Read Circular
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
