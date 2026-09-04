
import React from 'react';
import { db } from '@/lib/db';
import { FileText, Download, ExternalLink, Filter } from 'lucide-react';

export default async function OrdersPage() {
  const documents = await db.document.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
    include: { department: true },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Official Repository</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Government Orders & Circulars</h1>
        <p className="text-slate-600 text-sm mt-1">Official state notifications, gazette orders, and technical guidelines</p>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                  {doc.category.replace(/_/g, ' ')}
                </span>
                <span className="text-xs text-slate-500">{doc.issueDate}</span>
                {doc.visibility === 'MEMBERS_ONLY' && (
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-amber-50 text-amber-800 rounded border border-amber-300">
                    Members Only
                  </span>
                )}
              </div>
              <h3 className="font-bold text-base text-navy-900">{doc.title}</h3>
              <p className="text-xs text-slate-500">
                Department: <strong>{doc.department?.name || 'General Administration'}</strong>
                {doc.orderNumber && <> • Order No: <span className="font-mono">{doc.orderNumber}</span></>}
              </p>
            </div>
            <div>
              <a
                href={`/api/documents/stream?id=${doc.id}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-teal-700 text-white font-semibold text-xs hover:bg-teal-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                View Order
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
