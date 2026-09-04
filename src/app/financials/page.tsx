
import React from 'react';
import { db } from '@/lib/db';
import { FileText, Download } from 'lucide-react';

export default async function FinancialsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Fiscal Governance</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Financial Transparency</h1>
        <p className="text-slate-600 text-sm mt-1">Audited annual accounts, balance sheets, and subscription management</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="font-bold text-lg text-navy-900">Annual Audited Statements (F.Y. 2024-25)</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            The accounts of the Madhya Pradesh Government Engineers’ Association are audited annually by an independent Chartered Accountant firm in accordance with the association constitution.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-center">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs font-semibold text-slate-500 uppercase">Total Subscriptions</div>
              <div className="text-xl font-bold text-navy-900 mt-1">₹18,40,000</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs font-semibold text-slate-500 uppercase">Operational Expenses</div>
              <div className="text-xl font-bold text-navy-900 mt-1">₹12,15,400</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs font-semibold text-slate-500 uppercase">Closing Reserve Fund</div>
              <div className="text-xl font-bold text-teal-700 mt-1">₹6,24,600</div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="font-bold text-lg text-navy-900">Audited Report Archive</h2>
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-200 text-xs">
              <span className="font-medium text-navy-900">Audited Balance Sheet & P&L Statement F.Y. 2024-25 (PDF)</span>
              <span className="text-slate-500">Audited by M/s R.K. Agrawal & Co., Bhopal</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-200 text-xs">
              <span className="font-medium text-navy-900">Annual Receipts & Expenditure Statement F.Y. 2023-24 (PDF)</span>
              <span className="text-slate-500">Certified by State Council</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
