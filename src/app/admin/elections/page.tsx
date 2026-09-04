
import React from 'react';
import { db } from '@/lib/db';
import { AlertTriangle } from 'lucide-react';

export default async function AdminElectionsPage() {
  const election = await db.election.findFirst({
    where: { isActive: true },
    include: {
      posts: { include: { candidates: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Offline Election Administration</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage Returning Officer notices, physical polling venues, candidate vetting, and certified offline ballot results
        </p>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 space-y-1">
        <div className="font-bold flex items-center">
          <AlertTriangle className="w-4 h-4 mr-1.5 text-amber-600" />
          Strict Policy Reminder
        </div>
        <p>
          Voting is exclusively conducted physically via offline secret ballot. The system does not accept or process digital votes.
        </p>
      </div>

      {election && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-navy-900">{election.title}</h2>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
              Stage: {election.status}
            </span>
          </div>
          <div className="text-xs text-slate-600 space-y-1">
            <p><strong>Returning Officer:</strong> {election.returningOfficerName}</p>
            <p><strong>Physical Polling Venue:</strong> {election.pollingVenue}</p>
            <p><strong>Date of Offline Polling:</strong> {election.pollingDate} ({election.pollingTime})</p>
          </div>
        </div>
      )}
    </div>
  );
}
