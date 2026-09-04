
import React from 'react';
import { db } from '@/lib/db';
import { Vote, AlertTriangle, Calendar, MapPin, UserCheck } from 'lucide-react';

export default async function ElectionsPage() {
  const election = await db.election.findFirst({
    where: { isActive: true },
    include: {
      posts: {
        include: { candidates: true },
      },
    },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Association Elections</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Offline Election Cell</h1>
        <p className="text-slate-600 text-sm mt-1">Notifications, candidate rosters, physical voting venues, and certified results</p>
      </div>

      {/* Mandatory Offline Notice */}
      <div className="p-5 bg-amber-50 rounded-xl border-l-4 border-amber-500 border-y border-r border-amber-200 text-amber-900 text-xs space-y-1">
        <div className="flex items-center font-bold text-sm text-amber-800">
          <AlertTriangle className="w-4 h-4 mr-2" />
          MANDATORY NOTICE: STRICTLY PHYSICAL / OFFLINE VOTING
        </div>
        <p className="leading-relaxed">
          As mandated by the MP-GEA Constitution, all voting for the State Executive Council is conducted strictly offline via physical secret paper ballot at officially gazetted polling stations. <strong>This web portal does not accept, record, or count electronic votes.</strong>
        </p>
      </div>

      {election && (
        <div className="space-y-8">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-teal-700 uppercase">Year {election.electionYear}</span>
              <span className="px-3 py-0.5 text-xs font-bold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Stage: {election.status.replace(/_/g, ' ')}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-navy-900">{election.title}</h2>
            <p className="text-xs text-slate-600 leading-relaxed">{election.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 pt-3 border-t border-slate-100">
              <div>
                <strong>Returning Officer:</strong> {election.returningOfficerName}
              </div>
              <div className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-teal-700" /> Polling: {election.pollingDate} ({election.pollingTime})
              </div>
              <div className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-teal-700" /> {election.pollingVenue}
              </div>
            </div>
          </div>

          {/* Candidate Lists */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-navy-900">Nominated & Approved Candidates</h3>
            {election.posts.map((post) => (
              <div key={post.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-base font-bold text-teal-800 uppercase border-b border-slate-100 pb-2">
                  Post: {post.postTitle}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {post.candidates.map((cand) => (
                    <div key={cand.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                      <div className="font-bold text-navy-900 text-sm">{cand.candidateName}</div>
                      <div className="text-xs text-slate-600">{cand.designation} • {cand.department}</div>
                      {cand.shortBio && <div className="text-[11px] text-slate-500 italic mt-1">{cand.shortBio}</div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
