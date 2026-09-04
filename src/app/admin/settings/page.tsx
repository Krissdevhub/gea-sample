
import React from 'react';
import { db } from '@/lib/db';

export default async function AdminSettingsPage() {
  const [departments, branches, districts, membershipTypes] = await Promise.all([
    db.department.count(),
    db.engineeringBranch.count(),
    db.district.count(),
    db.membershipType.findMany(),
  ]);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Master System Configuration</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configurable association parameters, fee slabs, and territorial entities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-bold text-teal-700 uppercase">State Districts</div>
          <div className="text-2xl font-extrabold text-navy-900">{districts}</div>
          <p className="text-xs text-slate-500">All 55 MP revenue districts configured.</p>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-bold text-teal-700 uppercase">Engineering Departments</div>
          <div className="text-2xl font-extrabold text-navy-900">{departments}</div>
          <p className="text-xs text-slate-500">PWD, WRD, PHED, NVDA, RES, UADD, Discoms, etc.</p>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-bold text-teal-700 uppercase">Engineering Branches</div>
          <div className="text-2xl font-extrabold text-navy-900">{branches}</div>
          <p className="text-xs text-slate-500">Civil, Electrical, Mechanical, IT, etc.</p>
        </div>
      </div>
    </div>
  );
}
