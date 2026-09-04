
import React from 'react';
import { db } from '@/lib/db';

export default async function AdminFinancePage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-extrabold text-navy-900">Treasury & Financial Transparency</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage association balance sheets, expenditure ledgers, and annual audit reports
        </p>
      </div>

      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-bold text-base text-navy-900">F.Y. 2024-25 Financial Audit Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-semibold uppercase">Total Inflow</span>
            <div className="text-xl font-bold text-navy-900 mt-1">₹18,40,000</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-semibold uppercase">Total Outflow</span>
            <div className="text-xl font-bold text-navy-900 mt-1">₹12,15,400</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-semibold uppercase">Reserve Surplus</span>
            <div className="text-xl font-bold text-teal-700 mt-1">₹6,24,600</div>
          </div>
        </div>
      </div>
    </div>
  );
}
