
import React from 'react';

export default function GovernancePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Administrative Hierarchy</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Association Governance</h1>
        <p className="text-slate-600 text-sm mt-1">State Executive Council, Central Council, and District Units</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">Tier 1</div>
          <h3 className="text-lg font-bold text-navy-900">General Body</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Comprises all verified active members across all 55 districts. Convenes annually for the Annual General Body Meeting (AGM) to review policy and approve audited financial reports.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">Tier 2</div>
          <h3 className="text-lg font-bold text-navy-900">State Executive Council</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The executive managing body elected biennially through physical secret ballot. Entrusted with day-to-day government delegations, cadre advocacy, and portal oversight.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">Tier 3</div>
          <h3 className="text-lg font-bold text-navy-900">District Chapters</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            55 District Executive Committees coordinate local representations with District Collectors, Municipal Commissioners, and Chief Engineers of territorial zones.
          </p>
        </div>
      </div>
    </div>
  );
}
