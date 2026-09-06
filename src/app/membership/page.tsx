
import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default async function MembershipPage() {
  let plans: Awaited<ReturnType<typeof db.membershipType.findMany>> = [];
  try {
    plans = await db.membershipType.findMany();
  } catch { /* DB not available in demo mode */ }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Enrollment</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Membership Plans</h1>
        <p className="text-slate-600 text-sm mt-1">Transparent subscription categories for MP State Engineers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-bold text-base text-navy-900">{plan.name}</h3>
              <div className="text-2xl font-extrabold text-teal-700">
                ₹{plan.feeAmount}
                <span className="text-xs font-normal text-slate-500"> / {plan.validityYears} yr{plan.validityYears > 1 ? 's' : ''}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{plan.description}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/join"
                className="w-full inline-flex justify-center items-center py-2 px-3 rounded-md text-xs font-bold bg-teal-700 text-white hover:bg-teal-800 transition-colors"
              >
                Apply Now <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
