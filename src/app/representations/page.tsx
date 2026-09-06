
import React from 'react';
import { db } from '@/lib/db';

export default async function RepresentationsPage() {
  let reps: Awaited<ReturnType<typeof db.representation.findMany>> = [];
  try {
    reps = await db.representation.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  } catch { /* DB not available in demo mode */ }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Cadre Advocacy</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Important Representations</h1>
        <p className="text-slate-600 text-sm mt-1">Major cadre memorandums submitted to the Government of Madhya Pradesh</p>
      </div>

      <div className="space-y-6">
        {reps.map((r) => (
          <div key={r.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-teal-700 uppercase">{r.category}</span>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                {r.currentStage.replace(/_/g, ' ')}
              </span>
            </div>
            <h3 className="font-bold text-lg text-navy-900">{r.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{r.summary}</p>
            <div className="text-xs text-slate-500 pt-3 border-t border-slate-100">
              <strong>Addressed To:</strong> {r.authorityAddressed}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
