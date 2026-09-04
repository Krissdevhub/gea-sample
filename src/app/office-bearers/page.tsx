
import React from 'react';

export default function OfficeBearersPage() {
  const leaders = [
    { title: 'State President', name: 'Er. Sudhir Kumar Verma', designation: 'Superintending Engineer, PWD', district: 'Bhopal', email: 'president@mpgea.org' },
    { title: 'Vice President (Civil)', name: 'Er. Mahendra Singh Yadav', designation: 'Chief Engineer, WRD', district: 'Gwalior', email: 'vp.civil@mpgea.org' },
    { title: 'Vice President (Electrical/Mech)', name: 'Er. Alok Jain', designation: 'Superintending Engineer, MPTransco', district: 'Jabalpur', email: 'vp.em@mpgea.org' },
    { title: 'General Secretary', name: 'Er. Prashant Tiwari', designation: 'Executive Engineer, PHED', district: 'Indore', email: 'secretary@mpgea.org' },
    { title: 'Treasurer', name: 'Er. Rameshwar Patidar', designation: 'Executive Engineer, NVDA', district: 'Narmadapuram', email: 'treasurer@mpgea.org' },
    { title: 'Joint Secretary (Public Relations)', name: 'Er. Vivek Saxena', designation: 'Assistant Engineer, PWD', district: 'Bhopal', email: 'pr@mpgea.org' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Leadership Roster</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">State Office Bearers</h1>
        <p className="text-slate-600 text-sm mt-1">Executive Officers of the MP-GEA State Council</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaders.map((leader, i) => (
          <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-teal-700 border border-slate-200">
              👤
            </div>
            <div>
              <div className="text-xs font-bold text-teal-700 uppercase">{leader.title}</div>
              <h3 className="font-bold text-base text-navy-900">{leader.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{leader.designation}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-0.5">
              <p>📍 District: {leader.district}</p>
              <p>✉️ {leader.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
