
import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Institutional Charter</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">About MP-GEA</h1>
        <p className="text-slate-600 text-sm mt-1">Madhya Pradesh Government Engineers’ Association (म.प्र. शासकीय अभियंता संघ)</p>
      </div>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4 text-slate-700">
        <p className="text-base font-medium text-navy-900 leading-relaxed">
          The Madhya Pradesh Government Engineers’ Association (MP-GEA) is the unified, democratic representative association of gazetted and non-gazetted technical officers serving across all key engineering departments of the Government of Madhya Pradesh.
        </p>

        <h2 className="text-xl font-bold text-navy-900 pt-4">Genesis & Purpose</h2>
        <p>
          Established to bridge communication between serving engineers and the State Government, MP-GEA acts as the authoritative voice on cadre matters, technical autonomy, structural safety standards, and service parity. With over 2,000 engineers operating across 55 districts—from remote irrigation projects to major urban transportation corridors—MP-GEA safeguards professional dignity and operational transparency.
        </p>

        <h2 className="text-xl font-bold text-navy-900 pt-4">Scope of Representation</h2>
        <p>
          MP-GEA represents engineers appointed under:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Public Works Department (PWD)</li>
          <li>Water Resources Department (WRD)</li>
          <li>Public Health Engineering Department (PHED)</li>
          <li>Narmada Valley Development Authority (NVDA)</li>
          <li>Rural Engineering Services (RES / Panchayat & Rural Development)</li>
          <li>Urban Administration and Development Department (UADD)</li>
          <li>MP Electricity Generation, Transmission & Distribution Companies (Discoms)</li>
          <li>MP Police Housing & Infrastructure Development Corporation</li>
          <li>Municipal Corporations, Municipalities, and Development Authorities</li>
        </ul>

        <h2 className="text-xl font-bold text-navy-900 pt-4">Digital Modernization</h2>
        <p>
          In 2026, the State Executive Council adopted a unified digital operating model. The MP-GEA web portal eliminates manual recordkeeping, scattered paper notices, and undocumented representations. It provides all verified members with an authenticated Digital Membership Identity Card, a searchable gazette document library, and a tamper-proof grievance tracking mechanism.
        </p>
      </div>
    </div>
  );
}
