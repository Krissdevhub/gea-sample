
import React from 'react';

export default function ActivitiesPage() {
  const acts = [
    { title: 'High-Level Cadre Delegation to Additional Chief Secretary (GAD)', date: 'February 2026', desc: 'Executive Council submitted empirical findings on promotion backlogs across 5 engineering departments, seeking parity with administrative services.' },
    { title: 'Technical Workshop on Seismic Retrofitting of State Bridges', date: 'January 2026', desc: 'Over 140 executive and assistant engineers from PWD participated in a 2-day technical workshop on bridge health monitoring.' },
    { title: 'Statewide Blood Donation & Tree Plantation Drive', date: 'December 2025', desc: 'Organized across 20 district engineering circles marking National Engineers’ Day solidarity.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Initiatives</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Association Activities</h1>
        <p className="text-slate-600 text-sm mt-1">Advocacy delegations, technical seminars, and social initiatives</p>
      </div>

      <div className="space-y-4">
        {acts.map((a, i) => (
          <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
            <div className="text-xs text-teal-700 font-bold">{a.date}</div>
            <h3 className="font-bold text-base text-navy-900">{a.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
