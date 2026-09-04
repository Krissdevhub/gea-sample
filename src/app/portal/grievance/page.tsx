
import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { GrievanceForm } from './GrievanceForm';

export default async function GrievancePage() {
  const session = await getSession();
  if (!session || !session.memberId) redirect('/login');

  const grievances = await db.grievance.findMany({
    where: { memberId: session.memberId },
    orderBy: { createdAt: 'desc' },
    include: {
      updates: {
        where: { isInternal: false },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Grievance & Service Matters</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Submit cadre disputes, time-scale anomalies, promotion disparities, and safety concerns
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-navy-900">File New Grievance</h2>
          <GrievanceForm />
        </div>

        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-base font-bold text-navy-900">My Filed Grievances</h2>
          {grievances.length === 0 ? (
            <div className="p-8 bg-white rounded-2xl border border-dashed border-slate-200 text-center text-xs text-slate-500">
              No grievances filed yet.
            </div>
          ) : (
            <div className="space-y-4">
              {grievances.map((g) => (
                <div key={g.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded text-xs">
                      {g.referenceNumber}
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-slate-100 text-slate-800">
                      {g.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-navy-900">{g.subject}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{g.description}</p>

                  {g.updates.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                      <div className="text-[10px] uppercase font-bold text-teal-700 tracking-wider">
                        Committee Updates & Responses:
                      </div>
                      {g.updates.map((u) => (
                        <div key={u.id} className="p-2.5 bg-slate-50 rounded text-xs text-slate-700">
                          <div className="text-[10px] text-slate-400">{u.createdAt.toLocaleDateString()}</div>
                          <p className="mt-0.5 font-medium">{u.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
