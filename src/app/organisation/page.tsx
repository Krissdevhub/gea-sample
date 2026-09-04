
import React from 'react';

export default function OrganisationPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Structural Flow</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Organisational Structure</h1>
        <p className="text-slate-600 text-sm mt-1">Five-Tier Cadre Hierarchy of Madhya Pradesh</p>
      </div>

      <div className="space-y-4 max-w-2xl">
        <div className="p-4 bg-navy-900 text-white rounded-xl font-bold text-center border-l-4 border-teal-500">
          State Council (Executive Head)
        </div>
        <div className="text-center text-slate-400 text-lg">↓</div>
        <div className="p-4 bg-slate-800 text-white rounded-xl font-semibold text-center border-l-4 border-teal-600">
          Zonal / Regional Coordination Committees (10 Administrative Divisions)
        </div>
        <div className="text-center text-slate-400 text-lg">↓</div>
        <div className="p-4 bg-slate-700 text-white rounded-xl font-medium text-center border-l-4 border-teal-700">
          Divisional Units (Circle Level)
        </div>
        <div className="text-center text-slate-400 text-lg">↓</div>
        <div className="p-4 bg-teal-800 text-white rounded-xl font-medium text-center border-l-4 border-amber-400">
          District Chapters (55 District Units)
        </div>
        <div className="text-center text-slate-400 text-lg">↓</div>
        <div className="p-4 bg-white text-navy-900 rounded-xl font-medium text-center border border-slate-300 shadow-sm">
          Departmental & Field Units (Sub-Division / Project Offices)
        </div>
      </div>
    </div>
  );
}
