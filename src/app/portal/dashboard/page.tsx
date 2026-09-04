
import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import {
  CreditCard,
  FileText,
  AlertCircle,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Calendar,
} from 'lucide-react';
import { PaymentButton } from './PaymentButton';
import { CorrectionForm } from './CorrectionForm';

export default async function MemberDashboardPage() {
  const session = await getSession();
  if (!session || !session.memberId) {
    redirect('/login');
  }

  const member = await db.member.findUnique({
    where: { id: session.memberId },
    include: {
      department: true,
      branch: true,
      district: true,
      applications: { orderBy: { createdAt: 'desc' }, take: 1 },
      payments: { orderBy: { createdAt: 'desc' }, take: 1 },
      grievances: { orderBy: { createdAt: 'desc' }, take: 2 },
    },
  });

  if (!member) {
    redirect('/login');
  }

  const latestApp = member.applications[0];
  const isCorrection = member.status === 'CORRECTION_REQUIRED';
  const isApprovedAwaitingPayment = member.status === 'APPROVED_AWAITING_PAYMENT';
  const isActive = member.status === 'ACTIVE';

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Government Engineer Dashboard
          </div>
          <h1 className="text-2xl font-extrabold text-navy-900 mt-0.5">
            Welcome, {member.fullName}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {member.designation} • {member.department.name} • {member.district.name} District
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Membership Status</div>
            <div className="text-sm font-bold text-navy-900 font-mono">
              {member.membershipNumber || 'Number: Pending'}
            </div>
          </div>
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
            isActive
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
              : isCorrection
              ? 'bg-amber-50 text-amber-800 border border-amber-300'
              : isApprovedAwaitingPayment
              ? 'bg-sky-50 text-sky-800 border border-sky-300'
              : 'bg-slate-100 text-slate-700 border border-slate-300'
          }`}>
            {member.status.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* Action Banner: CORRECTION REQUIRED */}
      {isCorrection && latestApp && (
        <div className="p-6 bg-amber-50 rounded-2xl border-2 border-amber-400 shadow-sm space-y-4">
          <div className="flex items-center text-amber-900 font-bold text-base">
            <AlertCircle className="w-5 h-5 mr-2 text-amber-600" />
            <span>Action Required: Scrutiny Officer Requested Correction</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-amber-200 text-xs text-slate-800 space-y-1">
            <div className="font-bold text-amber-900 uppercase text-[10px]">Officer Verification Note:</div>
            <p className="text-sm font-medium">{latestApp.correctionRequested || 'Please provide updated service credentials or re-upload official appointment order.'}</p>
          </div>
          <CorrectionForm memberId={member.id} />
        </div>
      )}

      {/* Action Banner: APPROVED AWAITING PAYMENT */}
      {isApprovedAwaitingPayment && (
        <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-400 shadow-sm space-y-4">
          <div className="flex items-center text-emerald-900 font-bold text-base">
            <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" />
            <span>Service Credentials Verified & Approved!</span>
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed max-w-2xl">
            The Membership Scrutiny Committee has confirmed your departmental eligibility. To finalize enrollment and activate your official <strong>Digital Membership ID Card with QR Verification</strong>, please complete your annual subscription fee (₹1,000).
          </p>
          <PaymentButton memberName={member.fullName} />
        </div>
      )}

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/portal/id-card"
          className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-teal-500 hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 bg-teal-50 text-teal-700 rounded-lg flex items-center justify-center font-bold mb-3 group-hover:bg-teal-700 group-hover:text-white transition-colors">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-navy-900">Digital ID Card</h3>
          <p className="text-[11px] text-slate-500 mt-1">
            {isActive ? 'View, download, or print official ID' : 'Available post-payment activation'}
          </p>
        </Link>

        <Link
          href="/portal/documents"
          className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-teal-500 hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 bg-sky-50 text-sky-700 rounded-lg flex items-center justify-center font-bold mb-3 group-hover:bg-sky-700 group-hover:text-white transition-colors">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-navy-900">Protected Circulars</h3>
          <p className="text-[11px] text-slate-500 mt-1">
            Gazette orders, promotion drafts, pay rules
          </p>
        </Link>

        <Link
          href="/portal/grievance"
          className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-teal-500 hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center font-bold mb-3 group-hover:bg-amber-700 group-hover:text-white transition-colors">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-navy-900">My Grievances</h3>
          <p className="text-[11px] text-slate-500 mt-1">
            File cadre issues and track representation
          </p>
        </Link>

        <Link
          href="/portal/directory"
          className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-teal-500 hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 bg-indigo-50 text-indigo-700 rounded-lg flex items-center justify-center font-bold mb-3 group-hover:bg-indigo-700 group-hover:text-white transition-colors">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-navy-900">Member Directory</h3>
          <p className="text-[11px] text-slate-500 mt-1">
            Search engineers across 55 districts
          </p>
        </Link>
      </div>

      {/* Grievance & Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Grievances */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-navy-900">Recent Grievances & Service Matters</h3>
            <Link href="/portal/grievance" className="text-xs font-semibold text-teal-700 hover:underline">
              New Ticket +
            </Link>
          </div>

          {member.grievances.length === 0 ? (
            <div className="text-xs text-slate-500 py-6 text-center border border-dashed border-slate-200 rounded-xl">
              No active grievances filed. Click above to submit a service disparity.
            </div>
          ) : (
            <div className="space-y-3">
              {member.grievances.map((g) => (
                <div key={g.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-amber-800">{g.referenceNumber}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-200 text-slate-800">
                      {g.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="font-semibold text-navy-900">{g.subject}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Member Profile Highlights */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-navy-900">Verified Service Record</h3>
            <Link href="/portal/profile" className="text-xs font-semibold text-teal-700 hover:underline">
              Edit Details →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase">Government Employee ID</span>
              <span className="font-bold text-navy-900">{member.employeeId}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase">Engineering Discipline</span>
              <span className="font-bold text-navy-900">{member.branch.name}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase">Qualification</span>
              <span className="font-bold text-navy-900">{member.qualification}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase">Date of Joining Service</span>
              <span className="font-bold text-navy-900">{member.dateOfJoining}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
