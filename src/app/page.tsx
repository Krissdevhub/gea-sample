import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import type { Prisma } from '@prisma/client';
import { NoticeTicker } from '@/components/public/NoticeTicker';
import {
  FileText,
  Shield,
  CreditCard,
  Users,
  Building2,
  Calendar,
  AlertCircle,
  Award,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const revalidate = 60; // Refresh cache every 60 seconds

export default async function HomePage() {
  // Real database-backed statistics — falls back to zeros/empty in demo mode
  let activeMembersCount = 0;
  let districtsCount = 0;
  let departmentsCount = 0;
  let circularsCount = 0;
  type DocWithDept = Prisma.DocumentGetPayload<{ include: { department: true } }>;
  let latestCirculars: DocWithDept[] = [];
  let urgentNotices: Awaited<ReturnType<typeof db.document.findMany>> = [];
  let upcomingEvents: Awaited<ReturnType<typeof db.event.findMany>> = [];
  let representations: Awaited<ReturnType<typeof db.representation.findMany>> = [];

  try {
    [
      activeMembersCount,
      districtsCount,
      departmentsCount,
      circularsCount,
      latestCirculars,
      urgentNotices,
      upcomingEvents,
      representations,
    ] = await Promise.all([
      db.member.count({ where: { status: 'ACTIVE' } }),
      db.district.count({ where: { isActive: true } }),
      db.department.count({ where: { isActive: true } }),
      db.document.count({ where: { isPublished: true } }),
      db.document.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' },
        take: 4,
        include: { department: true },
      }),
      db.document.findMany({
        where: { category: 'ASSOCIATION_CIRCULAR', isPublished: true },
        orderBy: { createdAt: 'desc' },
        take: 1,
      }),
      db.event.findMany({
        where: { visibility: 'PUBLIC' },
        orderBy: { eventDate: 'asc' },
        take: 3,
      }),
      db.representation.findMany({
        where: { visibility: 'PUBLIC' },
        orderBy: { updatedAt: 'desc' },
        take: 2,
      }),
    ]);
  } catch { /* DB not available in demo mode — fallback values used */ }

  const tickerItems = urgentNotices.map((n) => ({
    id: n.id,
    title: n.title,
    link: `/orders`,
  }));

  return (
    <div className="space-y-0">
      {/* Notice Strip */}
      <NoticeTicker notices={tickerItems} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-navy-900 via-navy-800 to-slate-900 text-white py-16 md:py-24 px-4 sm:px-6 overflow-hidden border-b border-teal-500/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
              <span>🏛️ Apex Cadre Platform of Madhya Pradesh</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Connecting and Representing{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
                Government Engineers
              </span>{' '}
              Across Madhya Pradesh
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              The unified digital office for serving engineers across PWD, WRD, PHED, NVDA, RES, UADD, and State Corporations. Promoting technical autonomy, transparent cadre governance, and institutional welfare.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/join"
                className="inline-flex items-center px-6 py-3.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-900/40 transition-all"
              >
                Join MP-GEA <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center px-6 py-3.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-600 transition-all"
              >
                Member Portal Login
              </Link>
              <Link
                href="/verify/search"
                className="inline-flex items-center px-5 py-3.5 rounded-lg bg-transparent hover:bg-white/10 text-teal-300 font-medium text-sm transition-all"
              >
                Verify Digital ID
              </Link>
            </div>
          </div>

          {/* Hero Digital Card Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-gradient-to-br from-slate-800/90 to-navy-900/90 rounded-2xl p-6 border-2 border-teal-500/40 shadow-2xl backdrop-blur">
              <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">⚙️</span>
                  <div>
                    <div className="text-xs font-bold text-teal-300">MP-GEA DIGITAL ID</div>
                    <div className="text-[10px] text-slate-400">Official Membership Identity</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/40">
                  ACTIVE
                </span>
              </div>
              <div className="py-5 space-y-3">
                <div className="text-xs text-slate-400">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Representative Member</span>
                  <span className="font-bold text-white text-sm">Er. Rajesh Kumar Sharma</span>
                </div>
                <div className="text-xs text-slate-400 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Cadre</span>
                    <span className="text-slate-200 font-medium">Executive Engineer</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Department</span>
                    <span className="text-slate-200 font-medium">PWD (Civil)</span>
                  </div>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700 text-xs font-mono text-amber-300 flex justify-between items-center">
                  <span>MPGEA/2026/000001</span>
                  <span className="text-[10px] text-teal-400 uppercase font-sans">Bhopal</span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-700 flex justify-between items-center text-[10px] text-slate-400">
                <span>Tamper-Proof QR Verification</span>
                <Link href="/verify/MPGEA-2026-000001" className="text-teal-400 font-semibold hover:underline">
                  Sample Scan →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Database Statistics Strip */}
      <section className="bg-slate-100 border-b border-slate-200 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200/80">
            <div className="text-3xl sm:text-4xl font-extrabold text-navy-900">{activeMembersCount}</div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-1">
              Active Serving Members
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200/80">
            <div className="text-3xl sm:text-4xl font-extrabold text-teal-700">{districtsCount}</div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-1">
              Districts Represented
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200/80">
            <div className="text-3xl sm:text-4xl font-extrabold text-navy-900">{departmentsCount}</div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-1">
              Engineering Departments
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200/80">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600">{circularsCount}</div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-1">
              Orders & Circulars
            </div>
          </div>
        </div>
      </section>

      {/* Member Services & Capabilities */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Digital Office</div>
          <h2 className="text-3xl font-extrabold text-navy-900">Comprehensive Member Services</h2>
          <p className="text-slate-600 text-sm">
            Replacing scattered paper applications, manual receipts, and disconnected PDFs with an integrated digital ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-teal-50 text-teal-700 rounded-lg flex items-center justify-center font-bold mb-4">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-navy-900 mb-2">Digital Membership Card</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Official tamper-proof identity card featuring high-resolution graphics and encrypted QR verification for instant service validation.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-sky-50 text-sky-700 rounded-lg flex items-center justify-center font-bold mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-navy-900 mb-2">Government Orders & Rules</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Categorized library of gazette notifications, pay scales, transfer policies, seniority drafts, and departmental service rules.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center font-bold mb-4">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-navy-900 mb-2">Grievance Ticketing System</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Structured cadre representation portal. File service issues, upload memos, and track committee representation with the Government.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-700 rounded-lg flex items-center justify-center font-bold mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-navy-900 mb-2">Statewide Member Directory</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Filter by district, department, and branch. Connect with fellow serving engineers while safeguarding personal contact privacy.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center font-bold mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-navy-900 mb-2">Legal & Cadre Defense</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Association backing for arbitrary disciplinary actions, technical risk allowances, site safety protocols, and cadre rights.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-lg flex items-center justify-center font-bold mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-navy-900 mb-2">Offline Elections & Governance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparent election information, candidate rosters, physical voting schedules, and certified offline ballot archives.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Government Orders & Circulars */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Official Repository</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">Latest Orders & Circulars</h2>
            </div>
            <Link
              href="/orders"
              className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              View Document Archive <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {latestCirculars.map((doc) => (
              <div key={doc.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                      {doc.category.replace(/_/g, ' ')}
                    </span>
                    <span className="text-xs text-slate-500">{doc.issueDate}</span>
                  </div>
                  <h4 className="font-bold text-navy-900 text-sm hover:text-teal-700 line-clamp-2">
                    {doc.title}
                  </h4>
                  {doc.orderNumber && (
                    <div className="text-xs text-slate-500 font-mono">
                      Order: {doc.orderNumber}
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-slate-500">
                    {doc.department?.name || 'MP Government'}
                  </span>
                  <a
                    href={`/api/documents/stream?id=${doc.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-xs font-semibold text-teal-700 hover:underline"
                  >
                    View Document <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cadre Representations Section */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Advocacy in Action</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">Major Cadre Representations</h2>
          </div>
          <Link
            href="/representations"
            className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            All Representations <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {representations.map((rep) => (
            <div key={rep.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">{rep.category}</span>
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {rep.currentStage.replace(/_/g, ' ')}
                </span>
              </div>
              <h3 className="font-bold text-base text-navy-900">{rep.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{rep.summary}</p>
              <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                <strong>Addressed To:</strong> {rep.authorityAddressed}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join CTA Banner */}
      <section className="bg-navy-900 text-white py-16 px-4 sm:px-6 text-center relative overflow-hidden border-t-2 border-teal-500">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl font-extrabold text-white">
            Unite for Technical Excellence & Cadre Dignity
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            All serving engineers appointed under the Government of Madhya Pradesh or Municipal Local Bodies are eligible to join MP-GEA. Secure your official digital credentials today.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/join"
              className="px-8 py-3.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-950/50 transition-all"
            >
              Apply for Membership
            </Link>
            <Link
              href="/eligibility"
              className="px-6 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
