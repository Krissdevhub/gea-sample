
import React from 'react';
import Link from 'next/link';

export default function EligibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Criteria</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Membership Eligibility</h1>
        <p className="text-slate-600 text-sm mt-1">Statutory criteria for enrollment into MP-GEA</p>
      </div>

      <div className="space-y-6 text-sm text-slate-700">
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-navy-900">1. Recognized Government Departments</h2>
          <p className="text-xs leading-relaxed">
            Applicants must hold an active substantive, regular, or approved contractual engineering post under:
          </p>
          <ul className="list-disc pl-5 text-xs space-y-1">
            <li>State Engineering Services (PWD, WRD, PHED, NVDA, RES)</li>
            <li>Urban Administration & Development (Municipal Corporations, Councils)</li>
            <li>MP Power Transmission, Generation, and Distribution Companies</li>
            <li>State Infrastructure Boards & Corporations (MPRDC, MPPHC, Tourism Board)</li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-navy-900">2. Technical Qualifications</h2>
          <p className="text-xs leading-relaxed">
            Candidates must possess an AICTE/UGC-recognized Degree (B.E. / B.Tech / M.Tech) or Diploma in an approved branch of engineering (Civil, Electrical, Mechanical, Electronics, Computer/IT, Environmental, etc.).
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-navy-900">3. Proof of Service Requirement</h2>
          <p className="text-xs leading-relaxed">
            Applicants must submit a scan of their official Departmental Identity Card or Appointment/Posting Order. Submissions undergo mandatory verification by the Membership Scrutiny Committee before membership activation.
          </p>
        </div>
      </div>
    </div>
  );
}
