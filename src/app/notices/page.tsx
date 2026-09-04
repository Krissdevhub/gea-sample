
import React from 'react';
import { Bell } from 'lucide-react';

export default function NoticesPage() {
  const notices = [
    { title: 'Biennial General Body Meeting & Offline Elections Notice 2026', date: '01 March 2026', desc: 'Notice is hereby given for the convening of the General Body Meeting at Nirman Bhawan, Bhopal. Physical secret ballot elections will be held on the scheduled date.' },
    { title: 'Renewal of Annual Membership Subscriptions for Financial Year 2026-27', date: '15 February 2026', desc: 'All serving annual members are requested to complete digital renewal through the member portal before the expiration of the grace period.' },
    { title: 'Submission of Disparity Memorandums on Time-Scale Pay Scales', date: '28 January 2026', desc: 'Members facing pay anomalies under 6th/7th CPC are advised to register grievances with Cadre Advisory Cell.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Urgent Advisories</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">Association Notices</h1>
        <p className="text-slate-600 text-sm mt-1">Time-sensitive announcements for serving government engineers</p>
      </div>

      <div className="space-y-4">
        {notices.map((n, i) => (
          <div key={i} className="p-6 bg-white rounded-xl border-l-4 border-amber-500 border-y border-r border-slate-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">Urgent Notice</span>
              <span className="text-xs text-slate-500">{n.date}</span>
            </div>
            <h3 className="text-base font-bold text-navy-900">{n.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{n.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
