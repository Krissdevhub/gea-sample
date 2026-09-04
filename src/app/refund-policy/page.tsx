
import React from 'react';

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-sm text-slate-700">
      <h1 className="text-3xl font-extrabold text-navy-900">Refund & Cancellation Policy</h1>
      <p className="text-xs text-slate-500">Effective Date: 01 January 2026</p>
      <p className="leading-relaxed">
        MP-GEA is a non-profit professional association funded through member subscriptions. Subscription fees paid towards Annual or Life Membership are non-refundable once an official Digital Membership Number and Tax Receipt have been generated.
      </p>
      <h2 className="text-lg font-bold text-navy-900 pt-3">Duplicate Transactions</h2>
      <p>If an applicant or member experiences a duplicate deduction due to a payment gateway latency, the excess amount will be refunded to the original payment source within 7-10 working days upon verification of gateway transaction logs.</p>
    </div>
  );
}
