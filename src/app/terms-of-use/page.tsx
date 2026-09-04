
import React from 'react';

export default function TermsOfUsePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-sm text-slate-700">
      <h1 className="text-3xl font-extrabold text-navy-900">Terms of Use</h1>
      <p className="text-xs text-slate-500">Effective Date: 01 January 2026</p>
      <p className="leading-relaxed">
        By accessing this digital portal, you agree to comply with all terms and conditions set forth herein. Unauthorized access to protected circulars, impersonation of a government engineer, or submission of forged service credentials constitutes a statutory offense.
      </p>
      <h2 className="text-lg font-bold text-navy-900 pt-3">1. Account Responsibility</h2>
      <p>Members are responsible for maintaining the confidentiality of their portal login credentials. Any activity originating from your authenticated session is your responsibility.</p>
      <h2 className="text-lg font-bold text-navy-900 pt-3">2. Prohibition of Unauthorized Distribution</h2>
      <p>Protected member-only circulars and legal advisories are confidential to MP-GEA members. Unlawful redistribution to third parties without Executive Council sanction is prohibited.</p>
    </div>
  );
}
