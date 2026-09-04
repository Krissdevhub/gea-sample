
import React from 'react';

export default function ConstitutionPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Statutory Framework</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Constitution & Bylaws</h1>
        <p className="text-slate-600 text-sm mt-1">Rules of Governance and Association Charter</p>
      </div>

      <div className="space-y-6 text-sm text-slate-700">
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <h2 className="text-lg font-bold text-navy-900">Article I: Name & Jurisdiction</h2>
          <p className="text-xs leading-relaxed">
            The association shall be called the "Madhya Pradesh Government Engineers’ Association" (abbreviated as MP-GEA). Its official headquarters shall be located in Bhopal, and its territorial jurisdiction extends across the entire territory of the State of Madhya Pradesh.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <h2 className="text-lg font-bold text-navy-900">Article II: Eligibility & Membership Slabs</h2>
          <p className="text-xs leading-relaxed">
            Membership is open to any graduate or diploma engineer holding a substantive or officiating appointment under the Government of Madhya Pradesh or statutory municipal local bodies. Four classes of membership are recognized: (a) Serving Annual Member, (b) Life Member, (c) Retired Member, and (d) Honorary Member.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <h2 className="text-lg font-bold text-navy-900">Article III: Governance Structure</h2>
          <p className="text-xs leading-relaxed">
            The sovereign body of the association is the General Body. Operational administration is delegated to the State Executive Council comprising the President, Vice-Presidents, General Secretary, Joint Secretaries, Treasurer, and Executive Members elected biennially.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <h2 className="text-lg font-bold text-navy-900">Article IV: Offline Secret Ballot Elections</h2>
          <p className="text-xs leading-relaxed font-semibold text-navy-900">
            Mandatory Voting Principle: All elections for the State Executive Council and District Units shall be conducted strictly by physical/offline secret paper ballot administered by an independent Returning Officer. Under no circumstances does the association conduct or recognize online or electronic voting.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <h2 className="text-lg font-bold text-navy-900">Article V: Financial Auditing & Funds</h2>
          <p className="text-xs leading-relaxed">
            All membership subscriptions and revenues shall be deposited in a designated scheduled commercial bank account jointly operated by the President and Treasurer. Accounts shall be audited annually by a Chartered Accountant and published for member scrutiny.
          </p>
        </div>
      </div>
    </div>
  );
}
