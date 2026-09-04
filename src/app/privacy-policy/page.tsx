
import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-sm text-slate-700">
      <h1 className="text-3xl font-extrabold text-navy-900">Privacy Policy</h1>
      <p className="text-xs text-slate-500">Effective Date: 01 January 2026</p>
      <p className="leading-relaxed">
        The Madhya Pradesh Government Engineers’ Association (MP-GEA) is committed to safeguarding member privacy. This Privacy Policy details how we collect, protect, and handle service records and personal details of our members.
      </p>
      <h2 className="text-lg font-bold text-navy-900 pt-3">1. Information Collected</h2>
      <p>We collect information required strictly for verifying government service and association administration: Full Name, Department, Employee ID, Designation, Engineering Branch, Posting District, Official Mobile, and Email.</p>
      <h2 className="text-lg font-bold text-navy-900 pt-3">2. Protection of Sensitive Proofs</h2>
      <p>Uploaded departmental ID cards and appointment orders are stored in non-public, access-controlled server storage. They are never exposed via public links or search engines.</p>
      <h2 className="text-lg font-bold text-navy-900 pt-3">3. Public QR Verification Privacy</h2>
      <p>The public QR code verification endpoint reveals ONLY your Name, Membership Number, and Membership Status. Private telephone numbers, home addresses, and employee IDs are never exposed.</p>
    </div>
  );
}
