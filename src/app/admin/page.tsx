import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import {
  Users,
  UserCheck,
  CreditCard,
  AlertCircle,
  FileText,
  Vote,
  Calendar,
  DollarSign,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const revalidate = 0; // Live dynamic data

export default async function AdminOverviewPage() {
  const [
    totalMembers,
    activeMembers,
    pendingApplications,
    correctionRequired,
    openGrievances,
    totalDocuments,
    recentApplications,
    recentPayments,
  ] = await Promise.all([
    db.member.count(),
    db.member.count({ where: { status: 'ACTIVE' } }),
    db.member.count({ where: { status: 'SUBMITTED' } }),
    db.member.count({ where: { status: 'CORRECTION_REQUIRED' } }),
    db.grievance.count({ where: { status: { notIn: ['RESOLVED', 'CLOSED', 'REJECTED'] } } }),
    db.document.count(),
    db.member.findMany({
      where: { status: { in: ['SUBMITTED', 'CORRECTION_REQUIRED'] } },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { department: true, district: true },
    }),
    db.payment.findMany({
      where: { status: 'SUCCESS' },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { member: true },
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            Executive Command Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mt-0.5">
            Administration Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time state metrics across 55 districts and 10 engineering departments
          </p>
        </div>
        <div className="flex space-x-2">
          <Link
            href="/admin/verification"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow transition-colors"
          >
            Verification Queue ({pendingApplications})
          </Link>
          <a
            href="/api/admin/export?type=members"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors"
          >
            Export All Members (CSV)
          </a>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase text-slate-500">Total Enrolled</div>
          <div className="text-2xl font-extrabold text-navy-900 mt-1">{totalMembers}</div>
          <div className="text-[10px] text-slate-400 mt-1">Engineers in DB</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase text-emerald-600">Active Members</div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1">{activeMembers}</div>
          <div className="text-[10px] text-emerald-600 mt-1">Verified & Paid</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase text-amber-600">Pending Review</div>
          <div className="text-2xl font-extrabold text-amber-700 mt-1">{pendingApplications}</div>
          <div className="text-[10px] text-amber-600 mt-1">Needs Scrutiny</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase text-rose-600">Corrections</div>
          <div className="text-2xl font-extrabold text-rose-700 mt-1">{correctionRequired}</div>
          <div className="text-[10px] text-rose-600 mt-1">Awaiting Fix</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase text-indigo-600">Open Grievances</div>
          <div className="text-2xl font-extrabold text-indigo-700 mt-1">{openGrievances}</div>
          <div className="text-[10px] text-indigo-600 mt-1">Active Tickets</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase text-teal-600">Documents</div>
          <div className="text-2xl font-extrabold text-teal-700 mt-1">{totalDocuments}</div>
          <div className="text-[10px] text-teal-600 mt-1">Orders & Gazettes</div>
        </div>
      </div>

      {/* Two Columns: Recent Applications & Recent Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-navy-900">Pending Membership Scrutiny</h3>
            <Link href="/admin/verification" className="text-xs font-semibold text-teal-700 hover:underline">
              Open Workbench →
            </Link>
          </div>

          {recentApplications.length === 0 ? (
            <div className="p-6 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
              No pending applications in scrutiny queue. All clear!
            </div>
          ) : (
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div key={app.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-navy-900">{app.fullName}</div>
                    <div className="text-slate-500 text-[11px]">
                      {app.designation} • {app.department.name} • {app.district.name}
                    </div>
                  </div>
                  <Link
                    href="/admin/verification"
                    className="px-3 py-1 bg-amber-600 text-white font-bold rounded text-[11px] hover:bg-amber-700"
                  >
                    Scrutinize
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-navy-900">Recent Subscription Payments</h3>
            <Link href="/admin/payments" className="text-xs font-semibold text-teal-700 hover:underline">
              Full Ledger →
            </Link>
          </div>

          {recentPayments.length === 0 ? (
            <div className="p-6 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
              No payments recorded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentPayments.map((p) => (
                <div key={p.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-navy-900">{p.member.fullName}</div>
                    <div className="text-slate-500 text-[11px]">
                      {p.purpose.replace(/_/g, ' ')} • {p.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right font-bold text-emerald-700">
                    ₹{p.amount}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
